export default function Hero() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
      <p className="text-sm font-medium text-[var(--color-primary)] mb-4 tracking-wide">
        FOR DEVELOPERS RUNNING CLAUDE CODE
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
        Never miss an agent waiting on you.
      </h1>
      <p className="mt-6 text-lg text-gray-600 leading-relaxed">
        Run multiple Claude Code agents in parallel. AgentDesk tracks every task
        and notifies you the moment one needs your input — even if you're in a
        different tab.
      </p>
      <div className="mt-10">
        <a
          href="#waitlist"
          className="inline-block bg-[var(--color-primary)] text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Join the waitlist
        </a>
      </div>
    </section>
  )
}
