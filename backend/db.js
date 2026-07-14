// db.js — SQLite database setup for AgentDesk backend
//
// This replaces the in-memory `tasks = {}` object from the runner_v2.js
// prototype with a real, persistent database. Now tasks survive a
// server restart, which is required before this can be a real product.

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'agentdesk.db'));

// Create the tasks table if it doesn't exist yet.
// This mirrors the schema we designed earlier in the architecture doc.
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'queued',
    worktree_path TEXT,
    pending_question TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// ---- Simple query helpers used by the rest of the app ----

function createTask(description) {
  const stmt = db.prepare(
    'INSERT INTO tasks (description, status) VALUES (?, ?)'
  );
  const info = stmt.run(description, 'queued');
  return getTaskById(info.lastInsertRowid);
}

function getTaskById(id) {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function getAllTasks() {
  return db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
}

function updateTaskStatus(id, status, pendingQuestion = null) {
  db.prepare(
    `UPDATE tasks
     SET status = ?, pending_question = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`
  ).run(status, pendingQuestion, id);
  return getTaskById(id);
}

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTaskStatus,
};
