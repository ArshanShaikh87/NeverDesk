export default function ProblemSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 border-t border-border">
      <p className="font-mono text-sm text-accent">// the problem</p>
      <h2 className="font-display font-semibold text-2xl md:text-3xl mt-3 max-w-2xl">
        You're in another tab. The agent is stuck asking a question no one's
        answering.
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary">
        Claude Code pauses to ask for permission, mid-task. If you're not
        staring at that exact terminal, you don't notice — until minutes
        later, when you check back in and realize the agent has been idle
        the whole time.
      </p>
    </section>
  );
}
