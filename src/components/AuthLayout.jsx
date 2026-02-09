import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaRobot, FaCheckCircle } from 'react-icons/fa'
import { HiLightningBolt, HiShieldCheck, HiCube, HiChip } from 'react-icons/hi'
import { FloatingParticles, GlowingOrb, TextShimmer } from './Animated'
import { useMouseParallax } from '../hooks/useAnimations'
import { useState, useEffect, useMemo } from 'react'

/** Animated logo orb with rotating ring */
function AnimatedLogo() {
  return (
    <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
      {/* Outer rotating ring */}
      <div
        className="absolute -inset-2 rounded-2xl border border-primary/20"
        style={{ animation: 'spin-slow 12s linear infinite' }}
      />
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary blur-md opacity-40" />
      {/* Logo */}
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <FaRobot className="text-white text-2xl" />
      </div>
    </div>
  )
}

/** Animated feature list items */
function FeatureItem({ icon, text, delay }) {
  return (
    <div
      className="flex items-center gap-3 text-gray-300 text-sm group/item"
      style={{ animation: `slide-in-left 0.5s ease-out ${delay}s both` }}
    >
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary-light group-hover/item:bg-primary/10 group-hover/item:border-primary/30 group-hover/item:scale-110 transition-all duration-300">
        {icon}
      </div>
      <span className="group-hover/item:text-white transition-colors duration-200">{text}</span>
    </div>
  )
}

/** Animated testimonial carousel on branding panel */
function TestimonialSlider() {
  const testimonials = [
    { quote: 'AI agents cut our response time by 80%.', author: 'Sarah C., VP Sales' },
    { quote: 'Deployed in 2 weeks, ROI in 2 months.', author: 'Marcus R., Head of CX' },
    { quote: 'Like having a tireless team member 24/7.', author: 'Dr. Aisha P., Director' },
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-10 p-4 rounded-xl bg-white/[0.03] border border-white/5">
      <div className="relative h-16 overflow-hidden">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <p className="text-gray-400 text-sm italic mb-1">"{t.quote}"</p>
            <p className="text-gray-500 text-xs">— {t.author}</p>
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary-light w-4' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function AuthLayout() {
  const parallaxRef = useMouseParallax(0.008)
  const location = useLocation()

  // Determine which page for contextual messaging
  const pageType = location.pathname.includes('signup') ? 'signup'
    : location.pathname.includes('forgot') ? 'forgot'
    : 'login'

  const headlines = {
    login: { title: 'Welcome Back', subtitle: 'Sign in to your agent command center.' },
    signup: { title: 'Get Started', subtitle: 'Deploy your first AI agent in minutes.' },
    forgot: { title: 'No Worries', subtitle: "We'll help you get back into your account." },
  }

  const features = [
    { icon: <HiCube className="text-sm" />, text: 'Custom AI Agents' },
    { icon: <HiLightningBolt className="text-sm" />, text: 'Real-time Monitoring' },
    { icon: <HiChip className="text-sm" />, text: 'Human-in-the-Loop' },
    { icon: <HiShieldCheck className="text-sm" />, text: 'Enterprise Security' },
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-dark">
      {/* Left — Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-dark-light overflow-hidden items-center justify-center p-12">
        {/* Animated background */}
        <FloatingParticles count={18} />
        <GlowingOrb color="primary" size={500} className="top-1/4 left-1/2 -translate-x-1/2" />
        <GlowingOrb color="secondary" size={300} className="bottom-0 right-0" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div ref={parallaxRef} className="relative text-center max-w-md">
          {/* Animated Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group" style={{ animation: 'fade-up 0.6s ease-out both' }}>
            <AnimatedLogo />
            <span className="text-2xl font-bold text-white">
              Hextant<TextShimmer>Agency</TextShimmer>
            </span>
          </Link>

          {/* Context-aware headline */}
          <div style={{ animation: 'fade-up 0.6s ease-out 0.15s both' }}>
            <h2 className="text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
              {headlines[pageType].title}
            </h2>
            <p className="text-gray-400 text-lg mb-3">
              {headlines[pageType].subtitle}
            </p>
          </div>

          <div style={{ animation: 'fade-up 0.6s ease-out 0.3s both' }}>
            <p className="text-gray-500 text-sm mb-8">
              Deploy autonomous agents for sales, support, research, and operations — all from one powerful platform.
            </p>
          </div>

          {/* Animated feature list */}
          <div className="grid grid-cols-2 gap-3 text-left">
            {features.map((f, i) => (
              <FeatureItem key={f.text} icon={f.icon} text={f.text} delay={0.4 + i * 0.1} />
            ))}
          </div>

          {/* Testimonial slider */}
          <div style={{ animation: 'fade-up 0.6s ease-out 0.9s both' }}>
            <TestimonialSlider />
          </div>
        </div>
      </div>

      {/* Right — Auth Form */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0 relative overflow-hidden">
        {/* Subtle background glow on form side */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        {/* Mobile header */}
        <div className="lg:hidden p-4 flex items-center justify-center border-b border-white/5 bg-dark-light/80 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-white">
              Hextant<span className="gradient-text">Agency</span>
            </span>
          </Link>
        </div>

        {/* Form container — key forces re-mount for page transitions */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div key={location.pathname} className="w-full max-w-md" style={{ animation: 'fade-up 0.5s ease-out both' }}>
            <Outlet />
          </div>
        </div>

        {/* Bottom legal links */}
        <div className="relative p-4 text-center border-t border-white/5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/ai-usage-policy" className="hover:text-gray-300 transition-colors">AI Policy</Link>
            <span>© {new Date().getFullYear()} HextantAgency</span>
          </div>
        </div>
      </div>
    </div>
  )
}
