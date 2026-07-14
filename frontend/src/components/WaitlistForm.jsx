import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to a real backend/email service later
    setSubmitted(true);
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20 border-t border-border">
      <div className="rounded-2xl px-8 py-12 md:py-16 text-center bg-accent-light">
        <h2 className="font-display font-semibold text-2xl md:text-3xl">
          Get early access
        </h2>
        <p className="mt-3 max-w-md mx-auto text-sm md:text-base text-text-secondary">
          Be the first to try AgentDesk when it launches.
        </p>

        {submitted ? (
          <p className="mt-6 text-sm font-medium text-accent">
            You're on the list — we'll email you at launch.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 h-12 px-4 rounded-lg border border-border bg-surface text-sm outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-lg font-medium text-sm text-white bg-accent shrink-0"
            >
              Notify me
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
