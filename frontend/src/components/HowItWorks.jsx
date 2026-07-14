const steps = [
  {
    number: '01',
    title: 'Submit a task',
    description: 'Describe what you need done — AgentDesk queues it instantly.',
  },
  {
    number: '02',
    title: 'Agent works',
    description: 'Runs in an isolated workspace, in parallel with your other tasks.',
  },
  {
    number: '03',
    title: 'You get notified',
    description: 'Only when it genuinely needs a decision — nothing else.',
  },
  {
    number: '04',
    title: 'Review & merge',
    description: 'See the diff, approve it, done — from one dashboard.',
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 border-t border-border">
      <p className="font-mono text-sm text-accent">// how it works</p>
      <h2 className="font-display font-semibold text-2xl md:text-3xl mt-3">
        Four steps. Zero babysitting.
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
        {steps.map((step) => (
          <div key={step.number}>
            <span className="font-mono text-sm text-text-secondary">
              {step.number}
            </span>
            <h3 className="font-medium text-base mt-2">{step.title}</h3>
            <p className="text-sm mt-2 leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
