import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaGithub, FaMicrosoft, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaBuilding, FaCheck, FaRocket, FaCheckCircle } from 'react-icons/fa'
import { useMagnetic } from '../hooks/useAnimations'

const oauthProviders = [
  { name: 'Google', icon: <FaGoogle />, color: 'hover:border-red-400/40 hover:bg-red-500/5' },
  { name: 'GitHub', icon: <FaGithub />, color: 'hover:border-gray-400/40 hover:bg-gray-500/5' },
  { name: 'Microsoft', icon: <FaMicrosoft />, color: 'hover:border-blue-400/40 hover:bg-blue-500/5' },
]

const plans = [
  { id: 'starter', name: 'Starter', price: '$2,500/mo', desc: '1 agent · 5K actions' },
  { id: 'professional', name: 'Professional', price: '$6,500/mo', desc: '5 agents · 50K actions', popular: true },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: 'Unlimited · Custom SLA' },
]

const passwordChecks = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) },
  { label: 'One special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

/** Animated loading spinner */
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

/** Interactive ripple button */
function RippleButton({ children, className = '', disabled = false, type = 'submit', onClick }) {
  const [ripples, setRipples] = useState([])
  const magneticRef = useMagnetic(0.15)

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600)
    onClick?.(e)
  }

  return (
    <button ref={magneticRef} type={type} disabled={disabled} onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {ripples.map((r) => (
        <span key={r.id} className="absolute w-4 h-4 rounded-full bg-white/30 pointer-events-none" style={{ left: r.x - 8, top: r.y - 8, animation: 'ripple 0.6s ease-out forwards' }} />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

/** Password strength bar with animated fill */
function PasswordStrengthBar({ password }) {
  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
    return score
  }, [password])

  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-secondary']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']

  if (!password) return null

  return (
    <div className="mt-2" style={{ animation: 'fade-up 0.3s ease-out both' }}>
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${i < strength ? colors[strength - 1] : ''}`}
              style={{ width: i < strength ? '100%' : '0%', animation: i < strength ? 'progress-fill 0.5s ease-out both' : undefined }}
            />
          </div>
        ))}
      </div>
      <span className={`text-[11px] ${strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-yellow-400' : strength === 3 ? 'text-orange-400' : 'text-secondary'}`}>
        {labels[strength - 1] || ''}
      </span>
    </div>
  )
}

/** Mini confetti effect for success */
function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 60,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1,
      color: ['#6C3FE3', '#06D6A0', '#F72585', '#8B5CF6', '#34E8B8'][i % 5],
      size: 4 + Math.random() * 4,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: '30%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  )
}

/** Animated input with focus glow */
function AnimatedInput({ icon: Icon, delay = 0, ...props }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative" style={{ animation: `fade-up 0.4s ease-out ${delay}s both` }}>
      <div
        className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/40 to-secondary/40 transition-opacity duration-300"
        style={{ opacity: focused ? 1 : 0 }}
      />
      <div className="relative">
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${focused ? 'text-primary-light' : 'text-gray-500'}`} />
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={`w-full pl-11 ${props.className || 'pr-4'} py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors text-sm`}
        />
      </div>
    </div>
  )
}

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '', plan: 'professional' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [direction, setDirection] = useState('forward') // for slide direction

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const goForward = () => { setDirection('forward'); setStep(2) }
  const goBack = () => { setDirection('back'); setStep(1) }

  const handleStep1 = (e) => {
    e.preventDefault()
    goForward()
  }

  const handleStep2 = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDirection('forward')
      setStep(3)
    }, 1000)
  }

  const slideAnim = direction === 'forward' ? 'slide-in-right' : 'slide-in-left'

  // Step 3: Success / Email Verification
  if (step === 3) {
    return (
      <div className="relative" style={{ animation: 'scale-in 0.5s ease-out both' }}>
        <Confetti />
        <div className="text-center relative">
          <div
            className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-6"
            style={{ animation: 'bounce-in 0.6s ease-out 0.2s both' }}
          >
            <FaEnvelope className="text-3xl text-secondary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ animation: 'fade-up 0.4s ease-out 0.35s both' }}>
            Check Your Email
          </h1>
          <p className="text-gray-400 mb-2" style={{ animation: 'fade-up 0.4s ease-out 0.45s both' }}>
            {"We've sent a verification link to"}
          </p>
          <p className="text-white font-medium mb-6" style={{ animation: 'fade-up 0.4s ease-out 0.5s both' }}>
            {form.email}
          </p>
          <p className="text-gray-500 text-sm mb-8" style={{ animation: 'fade-up 0.4s ease-out 0.55s both' }}>
            Click the link in the email to verify your account and get started. The link expires in 24 hours.
          </p>
          <div className="space-y-3" style={{ animation: 'fade-up 0.4s ease-out 0.65s both' }}>
            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all">
              Resend Verification Email
            </button>
            <Link
              to="/login"
              className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold text-center hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Plan Selection
  if (step === 2) {
    return (
      <div key="step2" style={{ animation: `${slideAnim} 0.4s ease-out both` }}>
        <div className="text-center mb-8">
          {/* Animated step indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary w-12' : 'bg-white/10 w-8'}`}
              />
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose Your Plan</h1>
          <p className="text-gray-400 text-sm">Select a plan to get started. You can change anytime.</p>
        </div>

        <form onSubmit={handleStep2} className="space-y-4">
          <div className="space-y-3">
            {plans.map((plan, i) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setForm({ ...form, plan: plan.id })}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  form.plan === plan.id
                    ? 'bg-primary/10 border-primary/40 shadow-lg shadow-primary/5'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
                style={{ animation: `fade-up 0.4s ease-out ${0.1 + i * 0.08}s both` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{plan.name}</span>
                      {plan.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary-light text-[10px] font-bold uppercase tracking-wide" style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}>
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs">{plan.desc}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold">{plan.price}</span>
                    <div className={`w-5 h-5 mt-1 ml-auto rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      form.plan === plan.id ? 'border-primary bg-primary scale-110' : 'border-white/20'
                    }`}>
                      {form.plan === plan.id && <FaCheck className="text-[8px] text-white" style={{ animation: 'scale-in 0.2s ease-out both' }} />}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-start gap-2 pt-2" style={{ animation: 'fade-up 0.4s ease-out 0.4s both' }}>
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded bg-dark-light border-white/20 text-primary focus:ring-primary/50 accent-primary"
            />
            <label htmlFor="agree" className="text-xs text-gray-400 leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-primary-light hover:underline">Terms of Service</Link>,{' '}
              <Link to="/privacy" className="text-primary-light hover:underline">Privacy Policy</Link>, and{' '}
              <Link to="/ai-usage-policy" className="text-primary-light hover:underline">AI Usage Policy</Link>.
            </label>
          </div>

          <div style={{ animation: 'fade-up 0.4s ease-out 0.5s both' }}>
            <RippleButton
              disabled={!agreed || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : <><FaRocket className="text-sm" /> Create Account</>}
            </RippleButton>
          </div>

          <button
            type="button"
            onClick={goBack}
            className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
            style={{ animation: 'fade-up 0.4s ease-out 0.6s both' }}
          >
            ← Back
          </button>
        </form>
      </div>
    )
  }

  // Step 1: Registration Form
  return (
    <div key="step1" style={{ animation: `${slideAnim} 0.4s ease-out both` }}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary w-12' : 'bg-white/10 w-8'}`}
            />
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out both' }}>
          Create Your Account
        </h1>
        <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.08s both' }}>
          Start building AI agents in minutes.
        </p>
      </div>

      {/* OAuth — staggered */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {oauthProviders.map((provider, i) => (
          <button
            key={provider.name}
            type="button"
            className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${provider.color}`}
            style={{ animation: `fade-up 0.4s ease-out ${0.12 + i * 0.06}s both` }}
          >
            {provider.icon}
            <span className="hidden sm:inline">{provider.name}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6" style={{ animation: 'fade-up 0.3s ease-out 0.3s both' }}>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500 uppercase tracking-wider">or with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form onSubmit={handleStep1} className="space-y-4">
        <div className="grid grid-cols-2 gap-3" style={{ animation: 'fade-up 0.4s ease-out 0.35s both' }}>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
            <AnimatedInput icon={FaUser} type="text" name="name" required value={form.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Company</label>
            <AnimatedInput icon={FaBuilding} type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc" />
          </div>
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.42s both' }}>
          <label className="block text-sm text-gray-400 mb-1.5">Work Email</label>
          <AnimatedInput icon={FaEnvelope} type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" />
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.5s both' }}>
          <label className="block text-sm text-gray-400 mb-1.5">Password</label>
          <div className="relative">
            <AnimatedInput
              icon={FaLock}
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Animated password strength */}
          <PasswordStrengthBar password={form.password} />

          {form.password && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {passwordChecks.map((check, ci) => (
                <div
                  key={check.label}
                  className="flex items-center gap-1.5"
                  style={{ animation: `fade-up 0.3s ease-out ${ci * 0.05}s both` }}
                >
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${check.test(form.password) ? 'bg-secondary/20' : 'bg-white/5'}`}>
                    <FaCheck className={`text-[7px] transition-all duration-300 ${check.test(form.password) ? 'text-secondary scale-100' : 'text-gray-600 scale-0'}`} />
                  </div>
                  <span className={`text-[11px] transition-colors duration-300 ${check.test(form.password) ? 'text-gray-300' : 'text-gray-600'}`}>{check.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.58s both' }}>
          <RippleButton
            disabled={!form.name || !form.email || !form.password || !passwordChecks.every((c) => c.test(form.password))}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Plan Selection
          </RippleButton>
        </div>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6" style={{ animation: 'fade-up 0.4s ease-out 0.65s both' }}>
        Already have an account?{' '}
        <Link to="/login" className="text-primary-light hover:text-white font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
