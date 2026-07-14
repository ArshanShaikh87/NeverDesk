export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <p className="font-mono text-sm md:text-base text-accent">
        // for developers running Claude Code
      </p>

      <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.1] mt-4 max-w-3xl">
        Never miss another agent
        <br className="hidden sm:block" /> waiting on you.
      </h1>

      <p className="text-base md:text-lg mt-6 max-w-xl text-text-secondary">
        AgentDesk runs your Claude Code agents in parallel and notifies you
        the moment one needs a decision — even if you're three tabs away.
      </p>

      <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 h-12 px-4 rounded-lg border border-border bg-surface text-sm outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="h-12 px-6 rounded-lg font-medium text-sm text-white bg-accent shrink-0"
        >
          Join the waitlist
        </button>
      </form>
      <p className="text-xs mt-3 text-text-secondary">
        No spam. One email when we launch.
      </p>

      {/* Signature element: terminal -> notification demo.
          This is the ONE animated moment in the whole page — it
          visually shows the exact problem AgentDesk solves. */}
      <div className="mt-14 md:mt-16 max-w-lg rounded-xl border border-border overflow-hidden shadow-sm relative bg-[#14161A]">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#2A2D34]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="font-mono text-xs ml-2 text-[#8B8F98]">
            agent-2 — checkout.js
          </span>
        </div>
        <div className="px-4 py-5 font-mono text-sm text-gray-300">
          <p className="mb-1 text-emerald-300">
            $ claude-code --task "add filter"
          </p>
          <p className="mb-1">Updating listing.js...</p>
          <p className="typed-line">
            Do you want to proceed with dropdown filter? (y/n)
          </p>
        </div>

        <div className="notif-badge absolute -right-3 -top-3 sm:right-4 sm:top-4 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-alert-light border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-alert" />
          <span className="text-xs font-medium text-amber-800">
            Agent 2 needs you
          </span>
        </div>
      </div>
    </section>
  );
}
