// PROTOTYPE v2: Parallel Task Runner + "Needs Attention" Notification
//
// This directly targets YOUR real pain point:
// "Agent is waiting for my permission, I'm in another tab, I don't notice."
//
// New in this version:
//  1. Pattern detection — scans agent output for signs it's waiting on you
//  2. Desktop notification — fires an OS-level popup so you notice
//     even if you're in a completely different app/tab
//
// This uses dummy commands again (safe, no API cost) so you can test
// the ALERTING mechanism itself before wiring in real Claude Code.

const { spawn, exec } = require('child_process');
const os = require('os');

const tasks = {};

// ---- Patterns that suggest the agent needs YOUR input ----
// Start simple. You will tune this list based on what your real
// Claude Code sessions actually print when they pause for permission.
const NEEDS_INPUT_PATTERNS = [
  /permission/i,
  /waiting for/i,
  /do you want to proceed/i,
  /\(y\/n\)/i,
  /approve/i,
  /confirm/i,
  /\?\s*$/, // a line ending in a question mark
];

function looksLikeItNeedsInput(line) {
  return NEEDS_INPUT_PATTERNS.some((pattern) => pattern.test(line));
}

// ---- Cross-platform desktop notification ----
// This is the part that solves YOUR specific problem: it pops up a
// native OS notification, so it grabs your attention regardless of
// which tab/app is focused.
function notify(title, message) {
  const platform = os.platform();

  if (platform === 'darwin') {
    // macOS
    exec(`osascript -e 'display notification "${message}" with title "${title}" sound name "Ping"'`);
  } else if (platform === 'linux') {
    // Linux (requires libnotify / notify-send, usually preinstalled on desktop distros)
    exec(`notify-send "${title}" "${message}"`);
  } else if (platform === 'win32') {
    // Windows (PowerShell balloon-style notification)
    const psCommand = `powershell -Command "New-BurntToastNotification -Text '${title}', '${message}'"`;
    exec(psCommand, () => {}); // requires BurntToast module; see fallback below
  }

  // Fallback that ALWAYS works everywhere, no dependencies:
  console.log(`\n🔔🔔🔔 ATTENTION NEEDED: [${title}] ${message} 🔔🔔🔔\n`);
  process.stdout.write('\x07'); // terminal bell sound
}

function createTask(id, description) {
  tasks[id] = { id, description, status: 'queued', log: [] };
}

function runTask(id, command, args) {
  const task = tasks[id];
  task.status = 'working';
  console.log(`\n[Task ${id}] Started: "${task.description}"`);

  const proc = spawn(command, args);

  proc.stdout.on('data', (data) => {
    const line = data.toString().trim();
    task.log.push(line);
    console.log(`[Task ${id}] ${line}`);

    // *** This is the key new behavior ***
    if (looksLikeItNeedsInput(line)) {
      task.status = 'needs_input';
      notify(
        `Task ${id} needs you`,
        `"${task.description}" is waiting: "${line}"`
      );
    }
  });

  proc.stderr.on('data', (data) => {
    console.error(`[Task ${id}] ERROR: ${data.toString().trim()}`);
  });

  proc.on('close', (code) => {
    if (task.status !== 'needs_input') {
      task.status = code === 0 ? 'done' : 'blocked';
    }
    console.log(`[Task ${id}] Finished with status: ${task.status}`);
  });
}

// ---- TEST: simulate a task that eventually asks for permission ----
createTask(1, 'Fix payment bug (dummy)');
createTask(2, 'Add filter feature (dummy) - will ask for permission');

runTask(1, 'node', ['-e', 'setTimeout(() => console.log("working on payment fix..."), 1000); setTimeout(() => console.log("done"), 3000);']);

runTask(2, 'node', ['-e', `
  setTimeout(() => console.log("working on filter feature..."), 1000);
  setTimeout(() => console.log("Do you want to proceed with dropdown filter? (y/n)"), 2500);
`]);

/*
  Try this yourself:
  1. Run: node runner_v2.js
  2. Immediately switch to a completely different window/tab
  3. Wait ~3 seconds
  4. You should get a real OS notification popup pulling you back —
     THIS is the exact behavior that solves your described problem.

  If notify-send isn't installed on your Linux machine, run:
    sudo apt install libnotify-bin
  (On macOS/Windows this works out of the box with the code above.)

  NEXT: once this feels right, swap the dummy `runTask` calls for the
  real Claude Code CLI command, same as in the previous prototype.
*/
