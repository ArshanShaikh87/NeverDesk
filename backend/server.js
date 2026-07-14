// server.js — AgentDesk Backend Core Loop
//
// This is the next real step after runner_v2.js. It combines:
//   1. A real database (db.js) instead of an in-memory object
//   2. An HTTP API so the frontend (or Postman, for now) can create
//      and check on tasks
//   3. The same background-process + pattern-detection logic you
//      already validated in runner_v2.js
//
// Still using DUMMY commands here (safe, zero API cost) — swapping
// in the real Claude Code CLI is the LAST step, once everything
// below is working reliably.

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const MAX_PARALLEL_AGENTS = 3; // matches the plan-tier limit from our NFRs
let activeCount = 0;

const NEEDS_INPUT_PATTERNS = [
  /permission/i,
  /waiting for/i,
  /do you want to proceed/i,
  /\(y\/n\)/i,
  /approve/i,
  /confirm/i,
  /\?\s*$/,
];

function looksLikeItNeedsInput(line) {
  return NEEDS_INPUT_PATTERNS.some((pattern) => pattern.test(line));
}

// ---- Core execution logic (same idea as runner_v2.js, now DB-backed) ----
function runTask(task) {
  activeCount++;
  db.updateTaskStatus(task.id, 'working');
  console.log(`[Task ${task.id}] Started: "${task.description}"`);

  // Still a dummy command for now — this stands in for the real
  // `claude-code --task "..."` call.
  const proc = spawn('node', [
    '-e',
    `
      setTimeout(() => console.log("working on: ${task.description}"), 800);
      setTimeout(() => console.log("Do you want to proceed? (y/n)"), 2000);
    `,
  ]);

  proc.stdout.on('data', (data) => {
    const line = data.toString().trim();
    console.log(`[Task ${task.id}] ${line}`);

    if (looksLikeItNeedsInput(line)) {
      db.updateTaskStatus(task.id, 'needs_input', line);
      // NOTE: real desktop notification (from runner_v2.js) plugs in
      // right here once this is running as a real background service.
    }
  });

  proc.on('close', (code) => {
    activeCount--;
    const current = db.getTaskById(task.id);
    if (current.status !== 'needs_input') {
      db.updateTaskStatus(task.id, code === 0 ? 'done' : 'blocked');
    }
    console.log(`[Task ${task.id}] Finished.`);
    processQueue(); // free slot -> try to start the next queued task
  });
}

// ---- Simple queue: only start a task if we're under the parallel limit ----
function processQueue() {
  if (activeCount >= MAX_PARALLEL_AGENTS) return;

  const queued = db.getAllTasks().find((t) => t.status === 'queued');
  if (queued) {
    runTask(queued);
  }
}

// ---- API ----

// Create a new task
app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description || !description.trim()) {
    return res.status(400).json({ error: 'Task description is required' });
  }

  const task = db.createTask(description.trim());
  processQueue(); // try to start it immediately if a slot is free
  res.status(201).json(task);
});

// List all tasks with current status
app.get('/tasks', (req, res) => {
  res.json(db.getAllTasks());
});

// Get one task
app.get('/tasks/:id', (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Respond to a task that's waiting on input
// (For now this just marks it as resumed — real stdin-piping to the
// paused Claude Code process is added when we swap in the real CLI.)
app.post('/tasks/:id/respond', (req, res) => {
  const task = db.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (task.status !== 'needs_input') {
    return res.status(400).json({ error: 'Task is not waiting for input' });
  }

  db.updateTaskStatus(task.id, 'working', null);
  res.json({ message: 'Response received, task resumed' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`AgentDesk backend running on http://localhost:${PORT}`);
});
