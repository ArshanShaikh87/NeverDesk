import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import HowItWorks from '../components/HowItWorks'
import WaitlistForm from '../components/WaitlistForm'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <WaitlistForm />
      <Footer />
    </div>
  )
}
