# AgentDesk_frontend

# Agent Desk Building purpose :
AgentDesk ek dashboard hai jo aapke multiple Claude Code AI agents ko ek saath parallel mein chalata hai, unka status track karta hai, aur aapko sirf tab notify karta hai jab genuinely aapka decision chahiye ho — taaki aap kabhi bhi kisi agent ka "waiting for permission" prompt miss na karein.

# AgentDesk — Complete Product Development Roadmap
### (Working name — a BYOK dashboard to orchestrate multiple Claude Code agents for solo developers & small teams)

> This document treats your idea as a real product being built by a professional team. It's organized into **10 SDLC stages** covering all 50 items you listed. Each stage follows: Why → What to do → Deliverables → Best Practices → Common Mistakes → Tools → Exit Criteria.
>
> **Rule followed throughout:** No code is written until Stage 4 (Architecture) is fully approved by you.

---

## STAGE 1 — DISCOVERY & STRATEGY
*(Covers: #1 Product Vision, #2 Problem Statement, #3 Market Research, #4 Competitor Analysis, #5 Target Audience, #6 User Personas, #7 Business Requirements)*

### Why this phase matters
Every wasted month in a startup's life traces back to skipping this stage. If the problem isn't real, no amount of good engineering saves the product. This is the only stage where being "wrong" costs nothing — it's cheaper to be wrong on paper than in production.

### What needs to be done

**1. Product Vision**
A one-sentence, non-negotiable statement of what you're building and for whom.

> **Vision Statement (draft):** "AgentDesk lets solo developers run multiple Claude Code agents in parallel without losing track of what each one is doing — so they spend their time reviewing decisions, not babysitting terminals."

**2. Problem Statement**
Use the standard format: *[User] struggles with [problem] when [situation], which causes [impact]. Existing solutions like [alternatives] fail because [gap].*

> A solo developer running 2-3 Claude Code sessions in parallel loses track of which agent needs input, which is stuck, and which is done — because they must manually switch terminals to check. Existing tools (AgentCenter, LangGraph Platform) solve this for teams/enterprises but require framework setup and config overhead a solo dev doesn't want.

**3. Market Research — Deliverable: Market Sizing Table**

| Metric | Data Point | Source Type |
|---|---|---|
| TAM (all AI agent tooling) | $8.5B (2026) → $35B (2030) | Industry estimate (Deloitte) |
| SAM (agent orchestration/mgmt platforms) | Segment of above, growing fast — dozens of new entrants in 2026 | Market scan |
| SOM (solo-dev/indie tier, <$25/mo pricing) | Niche, underserved — most players target teams/enterprise | Your own positioning |

**4. Competitor Analysis — Deliverable: Comparison Matrix**

| Competitor | Target User | Price | Strength | Gap You Exploit |
|---|---|---|---|---|
| AgentCenter | Teams (proposal, RFP, ops) | $29–79/mo | Control-plane visibility | Not coding-specific, generic setup |
| Composio AO | Developers (OSS) | Free (self-hosted) | Deep git-worktree automation | CLI-only, no dashboard/notifications, DIY setup |
| Nimbalyst | Developers (OSS) | Free/donation | Visual multi-session editing | No smart interruption/notification logic |
| LangGraph Platform | Engineering teams | $25+/mo | Powerful graph control | Requires coding the orchestration yourself |

**5. Target Audience — Deliverable: Audience Definition**
- Primary: Solo/freelance developers already using Claude Code daily, comfortable with git, working on 2+ concurrent tasks.
- Secondary: 2–5 person dev teams/startups without dedicated DevOps.
- Explicitly NOT targeting: Enterprises needing SOC2/compliance (that's AgentCenter/IBM territory).

**6. User Personas — Deliverable: 2 Personas**

| | Persona A: "Rohan, the Freelancer" | Persona B: "Startup Trio" |
|---|---|---|
| Role | Solo full-stack freelancer | 3-person early-stage startup |
| Pain | Juggles 3 client codebases, forgets which AI task needs input | Small team, no bandwidth to manage agent sprawl |
| Goal | Ship faster without micromanaging AI | Shared visibility across the team |
| Willingness to pay | $10–15/mo, price-sensitive | $30–50/mo team plan |

**7. Business Requirements — Deliverable: BRD (Business Requirements Document) summary**
- Revenue model: BYOK subscription (tool fee only, no AI token markup).
- Success metric (6 months): 100 paying users OR 500 free-tier signups with 15% conversion.
- Constraint: Solo/small founder build — must be buildable without a dedicated infra team.

### Best Practices
- Talk to 10 real Claude Code users before writing a single requirement.
- Write the vision statement down and refuse to build anything that doesn't serve it.

### Common Mistakes to Avoid
- Building for the persona in your head instead of a real interviewed user.
- Confusing "cool idea" with "validated problem."

### Tools
Notion/Google Docs (documentation), a simple Google Form or Typeform (user interviews), X/Reddit (r/ClaudeAI, r/LocalLLaMA) for informal validation.

### Exit Criteria (before Stage 2)
✅ Vision statement written and unchanging
✅ At least 5–10 real conversations with target users validating the pain point
✅ Competitor matrix completed
✅ Personas approved by you

---

## STAGE 2 — REQUIREMENTS & PRODUCT PLANNING
*(Covers: #8 Functional Requirements, #9 Non-Functional Requirements, #10 MVP Planning, #11 Product Roadmap, #12 Feature Prioritization, #13 User Stories, #14 Acceptance Criteria)*

### Why this phase matters
This is where "I want an agent dashboard" becomes a buildable spec. Skipping this is why solo builders end up with half-finished feature soup.

### What needs to be done

**8. Functional Requirements — Deliverable: FRD Table**

| ID | Requirement |
|---|---|
| FR-01 | User can add their Claude API key (encrypted at rest) |
| FR-02 | User can submit a task (text description + target repo path) |
| FR-03 | System spawns a Claude Code process in an isolated git worktree per task |
| FR-04 | System shows live status per task: Queued / Working / Needs Input / Done / Blocked |
| FR-05 | System detects when an agent needs human input and notifies the user |
| FR-06 | User can respond to a pending question from the dashboard |
| FR-07 | User can review a diff and approve/merge or reject |
| FR-08 | System enforces a max parallel-agent limit per plan tier |

**9. Non-Functional Requirements — Deliverable: NFR Table**

| Category | Requirement |
|---|---|
| Security | API keys encrypted (AES-256) at rest; never logged in plaintext |
| Performance | Dashboard status update latency < 2s from agent event |
| Reliability | A crashed agent process must not corrupt task state |
| Scalability | Support 20 concurrent agent processes per server instance at MVP |
| Usability | New user can submit first task within 5 minutes of signup |

**10. MVP Planning — Deliverable: MVP Scope Line**
**In scope:** Task submission, single-user auth, BYOK key storage, parallel execution (up to 3 agents), status dashboard, basic pattern-based interruption detection, manual diff review.
**Out of scope (v2+):** Team/shared dashboards, AI-based smart classification, cost analytics, mobile app.

**11. Product Roadmap — Deliverable: Quarter View**

| Phase | Timeline | Goal |
|---|---|---|
| MVP | Weeks 1–8 | Solo-user core loop works end-to-end |
| V1.1 | Weeks 9–12 | Reliability, better notifications, onboarding polish |
| V2 | Month 4–6 | Team plans, shared dashboards, AI-based interruption detection |

**12. Feature Prioritization — Deliverable: MoSCoW Table**

| Feature | Priority |
|---|---|
| Task submission + queue | Must |
| Parallel background execution | Must |
| Git worktree isolation | Must |
| Status dashboard | Must |
| Pattern-based interruption detection | Must |
| BYOK key encryption | Must |
| AI-based smart classification | Should (v2) |
| Cost tracking | Should (v2) |
| Team/shared dashboards | Could (v2) |
| Mobile app | Won't (not now) |

**13–14. User Stories & Acceptance Criteria — Deliverable: Sample Stories**

> **Story:** As a solo developer, I want to submit a coding task so that an agent starts working on it without me opening a terminal.
> **Acceptance Criteria:**
> - Given I'm logged in, when I type a task and submit, a new task row appears with status "Queued" within 1 second.
> - Given a queue slot is free, the task moves to "Working" within 5 seconds.
> - Given the API key is invalid, I see a clear error instead of a silent failure.

> **Story:** As a user, I want to be notified only when an agent genuinely needs my input, so I'm not interrupted for routine progress updates.
> **Acceptance Criteria:**
> - Given the agent output matches a question pattern, status changes to "Needs Input" and a notification fires.
> - Given the agent output is routine progress text, no notification fires.
> - I can respond from the dashboard and the agent resumes within 5 seconds.

### Best Practices
- Every feature must map back to a user story; every story must map back to the vision.
- Write acceptance criteria in Given/When/Then — it removes ambiguity before dev starts.

### Common Mistakes to Avoid
- MVP scope creep ("just one more feature") — the #1 killer of solo-founder projects.
- Writing requirements with no measurable acceptance criteria.

### Tools
Notion/Linear/Trello for backlog, MoSCoW table in a spreadsheet.

### Exit Criteria
✅ FRD + NFR signed off
✅ MVP scope frozen in writing
✅ All Must-have features have user stories with acceptance criteria

---

## STAGE 3 — UX / UI DESIGN
*(Covers: #15 User Flow, #16 Information Architecture, #17 Wireframes, #18 UI/UX Design System, #19 Branding Guidelines)*

### Why this phase matters
Your core value prop is "less cognitive load." If the UI itself is confusing, you've defeated your own product before writing a line of backend code.

### What needs to be done

**15. User Flow — Deliverable: Primary Flow Diagram**
```
Signup → Add API Key → Land on Empty Dashboard
   → Click "New Task" → Fill task form (description, repo path)
   → Task appears in "Queued" → auto-moves to "Working"
   → [IF needs input] → Notification → User opens task → Responds → Resumes
   → Task → "Done" → User clicks "Review Diff" → Approve/Reject
   → Approved → Merged confirmation shown
```

**16. Information Architecture — Deliverable: Sitemap**
```
/login, /signup
/dashboard              (all tasks, status cards)
/dashboard/task/:id     (task detail, live log, respond box, diff viewer)
/settings/api-key       (BYOK key management)
/settings/billing       (subscription tier)
```

**17. Wireframes — Deliverable: Low-fidelity screens (described)**
- **Dashboard:** Left = task list with colored status pills (grey=queued, blue=working, orange=needs input, green=done). Right = detail panel for selected task.
- **Task Detail:** Top = live streaming log (read-only). Bottom = input box that only becomes active when status = "Needs Input."
- **Diff Review:** Split view — file tree left, diff right, Approve/Reject buttons sticky at bottom.

**18. UI/UX Design System — Deliverable: Token Set**

| Token | Value | Use |
|---|---|---|
| Color — Primary | Deep indigo | Actions, links |
| Color — Status: Working | Blue | Active task pill |
| Color — Status: Needs Input | Amber/orange | Draws eye without alarm |
| Color — Status: Done | Green | Completed |
| Color — Status: Blocked | Red | Errors |
| Typography | Inter / system-ui | Clean, developer-tool feel |
| Spacing scale | 4/8/16/24/32px | Consistent rhythm |

**19. Branding Guidelines — Deliverable: Mini brand sheet**
- Tone: Calm, precise, "control room" feel — not playful. Developer tools trust restraint over cuteness.
- Logo direction: Simple mark suggesting parallel tracks converging (multiple agents → one decision point).

### Best Practices
- Design the "Needs Input" state first — it's the emotional core of your product.
- Keep the dashboard information-dense but not noisy (developers prefer data over decoration).

### Common Mistakes to Avoid
- Over-designing the MVP UI — use a component library (don't hand-roll every button).
- Ignoring empty/error/loading states in wireframes.

### Tools
Figma (wireframes + design system), Excalidraw (quick flow diagrams).

### Exit Criteria
✅ All core screens wireframed
✅ Design tokens defined
✅ You've clicked through the flow on paper/Figma and it "feels" like the vision

---

## STAGE 4 — SOFTWARE ARCHITECTURE & SYSTEM DESIGN
*(Covers: #20 Software Architecture, #21 Tech Stack, #22 Monolith vs Microservices, #23 Database Design, #24 ER Diagram, #25 API Design, #26 Auth, #27 Security Planning)*

### Why this phase matters
This is the last stage before code. Decisions here (schema, API shape, auth model) are expensive to reverse later. This is also where your BYOK security promise gets engineered, not just claimed.

### What needs to be done

**20. Software Architecture — Deliverable: High-level Diagram**
```
[Browser Dashboard (React)]
        ↕ WebSocket + REST
[Backend API Server (Node.js/Express)]
        ↕
[Task Queue Manager] → spawns → [Agent Runner Processes]
        ↕                              ↕
   [SQLite/Postgres DB]        [Isolated Git Worktrees]
        ↕
[Encrypted API Key Vault]
```

**21. Technology Stack — Deliverable: Stack Table**

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Tailwind | You already know JS; fast to build dashboards |
| Backend | Node.js + Express | Matches your existing skillset (MySQL/JS background) |
| Realtime | Socket.io | Simplest reliable WebSocket abstraction |
| Database | SQLite (MVP) → PostgreSQL (v2) | Zero-ops for MVP, easy migration path |
| Process mgmt | Node `child_process` | No exotic tooling needed |
| Isolation | Git worktrees | Native git feature, no extra infra |
| Auth | JWT + bcrypt | Standard, well-documented |
| Encryption | AES-256-GCM (Node `crypto`) | For API key storage |

**22. Monolith vs Microservices — Deliverable: Decision Record**
> **Decision: Monolith.** At MVP scale (single founder, <1000 users), microservices add deployment/ops overhead with zero benefit. Revisit only if a specific component (e.g., agent runner) needs independent scaling.

**23–24. Database Design + ER Diagram — Deliverable: Schema**

```
users
 ├─ id (PK)
 ├─ email
 ├─ password_hash
 ├─ plan_tier (free/pro/team)
 └─ created_at

api_keys
 ├─ id (PK)
 ├─ user_id (FK → users.id)
 ├─ encrypted_key
 ├─ provider (anthropic)
 └─ created_at

tasks
 ├─ id (PK)
 ├─ user_id (FK → users.id)
 ├─ description
 ├─ repo_path
 ├─ status (queued/working/needs_input/done/blocked)
 ├─ worktree_path
 ├─ pending_question (nullable)
 ├─ created_at, updated_at

task_logs
 ├─ id (PK)
 ├─ task_id (FK → tasks.id)
 ├─ log_line
 └─ timestamp
```
Relationship: `users (1) → (many) api_keys`, `users (1) → (many) tasks`, `tasks (1) → (many) task_logs`

**25. API Design — Deliverable: Endpoint Table**

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /auth/signup, /auth/login | Auth |
| POST | /settings/api-key | Store encrypted BYOK key |
| POST | /tasks | Create new task |
| GET | /tasks | List user's tasks + status |
| GET | /tasks/:id/logs | Fetch task log stream |
| POST | /tasks/:id/respond | Send user's answer to a paused agent |
| POST | /tasks/:id/approve | Approve diff → merge |
| WS | /ws/tasks | Live status push channel |

**26. Authentication & Authorization — Deliverable: Model**
- JWT-based session auth. Every task/API-key row scoped strictly to `user_id` — no cross-user access possible even by ID guessing (enforce at query layer, not just UI).

**27. Security Planning — Deliverable: Checklist**
- [ ] API keys encrypted with AES-256-GCM, key-encryption-key stored in env/secrets manager (never in DB)
- [ ] Decrypted key used only in-memory for the duration of a spawn call, never written to disk or logs
- [ ] Rate limiting on auth endpoints
- [ ] Input sanitization on task description (it will be passed to a shell-adjacent process — treat as untrusted)
- [ ] HTTPS enforced everywhere

### Best Practices
- Design the schema for the data you actually have today — don't over-engineer for hypothetical scale.
- Treat the BYOK key like a secret, always, including in dev/staging environments.

### Common Mistakes to Avoid
- Storing API keys in plaintext "just for now" — this becomes permanent tech debt and a trust-breaking risk.
- Passing raw user text into shell commands without sanitization (injection risk).

### Tools
dbdiagram.io (ER diagrams), Postman/Insomnia (API design/testing), draw.io (architecture diagrams).

### Exit Criteria
✅ Architecture diagram approved
✅ Schema + ER diagram finalized
✅ API contract written before any backend code
✅ Security checklist reviewed

---

## STAGE 5 — ENGINEERING SETUP & PROCESS
*(Covers: #28 Folder Structure, #29 Coding Standards, #30 Git Strategy, #31 Branching Strategy, #32 Dev Environment, #33 Task Breakdown, #34 Sprint Planning)*

### Why this phase matters
Even a solo dev benefits from process discipline — it's what lets you pause a project for 2 weeks and come back without confusion.

### What needs to be done

**28. Folder Structure** — see Master Folder Structure at the end of this document.

**29. Coding Standards — Deliverable**
- ESLint + Prettier configured from day 1 (Airbnb or Standard config).
- Naming: `camelCase` for JS variables/functions, `PascalCase` for React components, `snake_case` for DB columns.
- One function = one responsibility (directly relevant given your fishbone-library debugging experience — the original bug came from a function doing too many implicit things).

**30–31. Git Strategy & Branching — Deliverable**
> **Strategy: Trunk-based with short-lived feature branches.** Solo/small team doesn't need full GitFlow overhead.
```
main (always deployable)
 └─ feature/task-queue
 └─ feature/agent-runner
 └─ fix/websocket-reconnect
```
Merge to `main` only via PR, even solo — forces a self-review pause.

**32. Development Environment Setup — Deliverable: Checklist**
- [ ] `.env.example` committed (never real secrets)
- [ ] `docker-compose.yml` for local DB so environment is reproducible
- [ ] README with one-command setup (`npm install && npm run dev`)

**33–34. Task Breakdown & Sprint Planning — Deliverable: Sprint 1 Plan**

| Sprint | Goal | Key Tasks |
|---|---|---|
| Sprint 0 | Setup | Repo, CI skeleton, DB schema migration |
| Sprint 1 | Core loop | Auth, API key storage, task creation, basic queue |
| Sprint 2 | Execution | child_process runner, git worktree isolation, live logs |
| Sprint 3 | Interruption | Pattern detection, notification, respond flow |
| Sprint 4 | Review & polish | Diff viewer, approve/merge, dashboard UI pass |

### Best Practices
- 1–2 week sprints even solo — it creates forcing functions to ship increments.
- Commit small, commit often; a PR should be reviewable in <15 minutes.

### Common Mistakes to Avoid
- Skipping `.env.example` / secrets hygiene "because it's just me" — this bites later when you add a co-founder or go to production.
- Sprint plans with no clear "done" definition.

### Tools
GitHub/GitLab, GitHub Projects or Linear for sprint boards, Docker Desktop.

### Exit Criteria
✅ Repo initialized with linting/formatting configured
✅ Branching strategy documented in CONTRIBUTING.md
✅ Sprint 1 backlog broken into tickets

---

## STAGE 6 — DEVELOPMENT
*(Covers: #35 Backend Development Plan, #36 Frontend Development Plan)*

### Why this phase matters
This is where design becomes reality — but only after Stages 1–5 are locked, so development doesn't become guesswork.

### What needs to be done

**35. Backend Development Plan — Deliverable: Build Order**
1. DB models + migrations (users, api_keys, tasks, task_logs)
2. Auth endpoints (signup/login, JWT middleware)
3. API key encrypt/decrypt utility (isolated, unit-tested module — this is your highest-risk code)
4. Task CRUD endpoints
5. Task Queue Manager (in-memory for MVP, tracks active vs queued)
6. Agent Runner module (`child_process.spawn`, wraps Claude Code CLI, captures stdout/stderr stream)
7. Git worktree manager (create/cleanup per task)
8. Pattern-matcher for "needs input" detection
9. WebSocket layer to push status changes to frontend

**36. Frontend Development Plan — Deliverable: Build Order**
1. Auth pages (login/signup) + API key settings page
2. Dashboard shell + task list (static, mock data first)
3. WebSocket hook to receive live status updates
4. Task detail panel with live log viewer
5. Respond box (conditional render on "needs_input" status)
6. Diff viewer + approve/reject actions
7. Notification system (in-app + optional email)

### Best Practices
- Build backend endpoints with mock/stub data first, wire frontend to them, THEN implement the real agent runner — this de-risks the hardest part last, with a working shell already in place.
- Write the encryption/decryption utility as an isolated, independently testable module before touching anything else security-related.

### Common Mistakes to Avoid
- Building frontend and backend in total isolation with no integration checkpoint until the end (integration hell).
- Building the agent-runner (hardest, most novel part) first without a working scaffold around it to test against.

### Tools
VS Code, Postman for API testing during dev, React DevTools.

### Exit Criteria
✅ Backend endpoints pass Postman smoke tests
✅ Frontend renders against real backend (not mocks)
✅ End-to-end: submit task → see it complete → review diff, works locally

---

## STAGE 7 — QUALITY ASSURANCE & TESTING
*(Covers: #37 Testing Strategy, #38 Code Review Process)*

### Why this phase matters
Recall your own fishbone-library debugging session — a subtle mismatch (`RC` vs `RCN`) silently broke a feature with no error thrown. Untested code hides exactly these bugs. Testing is how you catch that before a paying user does.

### What needs to be done

**37. Testing Strategy — Deliverable: Test Plan Table**

| Type | What it covers | Example for AgentDesk |
|---|---|---|
| Unit | Individual functions | Encryption utility, pattern-matcher logic |
| Integration | Modules working together | Task creation → queue → process spawn |
| E2E | Full user flow | Signup → add key → submit task → respond → merge |
| UAT | Real user validation | 3–5 beta users complete real tasks, report friction |

**38. Code Review Process — Deliverable: PR Checklist**
- [ ] Does this touch the encryption/key-handling code? → Extra scrutiny required.
- [ ] Are new endpoints scoped to `user_id`? (prevent cross-user data leaks)
- [ ] Are edge cases tested (empty task text, invalid API key, crashed process)?
- [ ] No secrets/keys in logs or commit history.

### Best Practices
- Write tests for the "needs input" pattern-matcher especially — false positives/negatives directly break your core value prop, exactly like the `s_type` mismatch bug you diagnosed earlier.
- Test what happens when a spawned agent process crashes mid-task — state must not corrupt.

### Common Mistakes to Avoid
- Only testing the happy path (a lesson directly from your own debugging session — the PROD bug existed because an edge case in the data shape was never tested).
- Skipping tests on the encryption module because "it's simple."

### Tools
Jest (unit/integration), Playwright or Cypress (E2E), a small beta user group in a private Discord/WhatsApp group for UAT feedback.

### Exit Criteria
✅ Unit test coverage on critical modules (auth, encryption, queue, pattern-matcher)
✅ E2E happy-path test passing
✅ 3–5 UAT users have completed a real task without you helping them

---

## STAGE 8 — DEVOPS & DEPLOYMENT
*(Covers: #39 CI/CD, #40 Docker, #41 Deployment Strategy, #42 Cloud Infrastructure, #43 Monitoring & Logging, #44 Error Handling, #45 Performance Optimization, #46 Scalability Planning, #47 Backup & Disaster Recovery)*

### Why this phase matters
This is where the product becomes real and reliable for paying users, not just for you on localhost.

### What needs to be done

**39. CI/CD Pipeline — Deliverable: Pipeline Stages**
```
On PR → lint → unit tests → build
On merge to main → integration tests → deploy to staging
Manual approval → deploy to production
```

**40. Docker & Containerization — Deliverable**
- Backend containerized (Node app + isolated volume for git worktrees).
- Note: agent runner processes need filesystem access — plan volume mounts carefully; this is the trickiest part of containerizing this specific product.

**41. Deployment Strategy — Deliverable**
- MVP: Single VPS (DigitalOcean/Railway/Render) — simplest possible path, matches "solo founder" constraint from Stage 1.
- Blue-green or simple rolling restart once you have >50 active users.

**42. Cloud Infrastructure — Deliverable: MVP Infra List**

| Component | Choice |
|---|---|
| App hosting | Render/Railway (simplest for solo founder) |
| Database | Managed Postgres (once migrated from SQLite) |
| Secrets | Environment variables via host's secret manager |
| Domain/SSL | Cloudflare (free SSL + DNS) |

**43. Monitoring & Logging — Deliverable**
- Structured logs (JSON) for task lifecycle events — critical for debugging agent runner issues (same skill you used diagnosing the fishbone bug — you'll need to trace "what did the agent actually output" after the fact).
- Uptime monitoring (simple ping-based) from day 1.

**44. Error Handling — Deliverable: Policy**
- Every agent-runner crash → task status = "blocked" with a human-readable reason, never a silent failure (directly avoiding the class of bug you debugged earlier, where a mismatch failed silently with no error).

**45–46. Performance & Scalability — Deliverable**
- MVP target: 20 concurrent agent processes per server. Beyond that, move Task Queue Manager to Redis-backed queue (BullMQ) — documented as a v2 trigger, not built prematurely.

**47. Backup & Disaster Recovery — Deliverable**
- Daily automated DB backups (even on a $5 VPS, this is non-negotiable — you're storing encrypted user credentials).
- Documented recovery steps in `/docs/disaster-recovery.md`.

### Best Practices
- Log everything about agent process lifecycle — it's your only visibility into a black-box background process.
- Set up alerting for "task stuck in Working > 30 min" — a strong signal of a silent bug.

### Common Mistakes to Avoid
- No backups "at MVP stage" — one bad migration and you lose every user's encrypted key mapping.
- Deploying without staging — same mismatch-type bugs you diagnosed in PROD can happen here if you never test against production-like data.

### Tools
GitHub Actions (CI/CD), Docker, Render/Railway/DigitalOcean, Cloudflare, a simple logging tool (even just structured console logs shipped to a file initially).

### Exit Criteria
✅ CI pipeline green on every PR
✅ Staging environment mirrors production
✅ Backups running and a recovery drill has been tested at least once

---

## STAGE 9 — DOCUMENTATION & RELEASE
*(Covers: #48 Documentation, #49 Release Management)*

### Why this phase matters
Documentation is what lets future-you (or a future teammate) not repeat the diagnostic work you did manually in our earlier conversation.

### What needs to be done

**48. Documentation — Deliverable: Doc Set**
- `/docs/architecture.md` — system diagram + decisions
- `/docs/api.md` — endpoint reference
- `/docs/runbook.md` — "agent stuck / crashed / key invalid" troubleshooting steps
- User-facing: a simple onboarding guide ("Add your key → submit your first task")

**49. Release Management — Deliverable: Release Checklist**
- [ ] Changelog updated
- [ ] Migration scripts tested on staging
- [ ] Feature flag off for risky new features until validated with a subset of users
- [ ] Rollback plan documented before every release

### Best Practices
- Write the runbook while debugging, not after — capture real incidents (like the fishbone RC/RCN mismatch pattern) as they happen.

### Common Mistakes to Avoid
- Documentation written once and never updated — becomes actively misleading.

### Tools
Markdown docs in-repo (`/docs`), a simple CHANGELOG.md.

### Exit Criteria
✅ Core docs exist and are current
✅ A release checklist is used for every deploy, not improvised each time

---

## STAGE 10 — MAINTENANCE & FUTURE PLANNING
*(Covers: #50 Maintenance & Future Feature Planning)*

### Why this phase matters
Launch is the beginning, not the end. This is where you decide how the product evolves without becoming feature soup again.

### What needs to be done
- Set a monthly "signal review": support tickets, UAT feedback, usage patterns → feed into the roadmap (Stage 2, revisited quarterly).
- Maintain a public or private roadmap so users know AI-based smart classification, team dashboards, and cost tracking are coming (from your MoSCoW "Should/Could" list).

### Best Practices
- Fix reliability bugs before adding new features — a stuck agent with no error message will churn users faster than a missing feature will.

### Common Mistakes to Avoid
- Adding v2 features (team dashboards, AI classification) before the core loop is rock-solid for a single user.

---

## MASTER PROJECT FOLDER STRUCTURE

```
agentdesk/
├── docs/
│   ├── product-vision.md
│   ├── competitor-analysis.md
│   ├── personas.md
│   ├── frd-nfr.md
│   ├── architecture.md
│   ├── api.md
│   ├── runbook.md
│   └── disaster-recovery.md
│
├── design/
│   ├── wireframes/
│   ├── design-system/
│   └── branding/
│
├── database/
│   ├── schema.sql
│   ├── er-diagram.png
│   └── migrations/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── agent-runner/
│   │   ├── queue-manager/
│   │   ├── encryption/
│   │   └── websocket/
│   ├── tests/
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   └── tests/
│
├── devops/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── ci-cd/ (GitHub Actions workflows)
│
├── testing/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── CONTRIBUTING.md
├── CHANGELOG.md
└── README.md
```

---

## MILESTONE-BASED IMPLEMENTATION PLAN

| Milestone | Weeks | Deliverable | Go/No-Go Check |
|---|---|---|---|
| M0 — Discovery Complete | 1 | Stage 1–3 docs approved by you | Vision + personas + wireframes signed off |
| M1 — Architecture Locked | 2 | Stage 4 docs: schema, API contract, security checklist | No backend code written before this is done |
| M2 — Engineering Foundation | 3 | Repo, CI, folder structure, sprint plan | `npm run dev` works for a fresh clone |
| M3 — Backend Core Loop | 4–5 | Auth, task CRUD, queue manager | Can create a task via Postman and see it in DB |
| M4 — Agent Runner Alive | 6–7 | child_process wrapper + git worktree isolation working | A real Claude Code task runs end-to-end from API call |
| M5 — Frontend Connected | 8 | Dashboard shows live status via WebSocket | You can submit + watch a task from the browser |
| M6 — Interruption Flow | 9 | Pattern detection + respond flow | A paused agent resumes correctly after your input |
| M7 — Review & Merge | 10 | Diff viewer + approve/merge | Full loop: submit → work → pause → respond → done → merge |
| M8 — Hardened for Beta | 11–12 | Tests, logging, error handling, backups | 3–5 real users complete a task without your help |
| M9 — Public MVP Launch | 13 | Deployed, monitored, documented | Paying customer #1 |

---

**Next step:** Review Stages 1–4 first and confirm/adjust before we touch Stage 5 onward — architecture decisions are the ones that are expensive to reverse later.