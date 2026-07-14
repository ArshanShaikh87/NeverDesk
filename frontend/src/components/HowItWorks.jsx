const steps = [
  {
    title: 'Submit your tasks',
    description: 'Describe what each agent should work on — as many as you want, in parallel.',
  },
  {
    title: 'Agents run in isolation',
    description: 'Each task runs in its own git worktree, so nothing overwrites anything else.',
  },
  {
    title: 'Get notified when it matters',
    description: 'A desktop alert fires only when an agent genuinely needs your input.',
  },
  {
    title: 'Review, then merge',
    description: 'See the diff, approve or reject, right from the dashboard.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-16">
        How it works
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-4">
            <span className="text-[var(--color-primary)] font-mono text-sm mt-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-medium text-gray-900">{step.title}</h3>
              <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
