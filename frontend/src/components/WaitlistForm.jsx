import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }

    // TODO: replace with a real API call once the backend exists.
    // For now this just simulates success so the flow can be tested.
    console.log('Waitlist signup:', email)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="waitlist" className="px-6 py-24 text-center">
        <p className="text-lg font-medium text-gray-900">You're on the list.</p>
        <p className="mt-2 text-gray-600">We'll email you when AgentDesk is ready.</p>
      </section>
    )
  }

  return (
    <section id="waitlist" className="px-6 py-24 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
        Get early access
      </h2>
      <p className="mt-3 text-gray-600">
        We'll let you know the moment AgentDesk is ready to try.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Notify me
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-[var(--color-status-blocked)]">{error}</p>}
    </section>
  )
}
