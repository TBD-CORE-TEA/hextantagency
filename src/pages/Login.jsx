import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaGithub, FaMicrosoft, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa'
import { useMagnetic } from '../hooks/useAnimations'

const oauthProviders = [
  { name: 'Google', icon: <FaGoogle />, color: 'hover:border-red-400/40 hover:bg-red-500/5' },
  { name: 'GitHub', icon: <FaGithub />, color: 'hover:border-gray-400/40 hover:bg-gray-500/5' },
  { name: 'Microsoft', icon: <FaMicrosoft />, color: 'hover:border-blue-400/40 hover:bg-blue-500/5' },
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
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600)
    onClick?.(e)
  }

  return (
    <button
      ref={magneticRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute w-4 h-4 rounded-full bg-white/30 pointer-events-none"
          style={{
            left: r.x - 8,
            top: r.y - 8,
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

/** Animated input with focus glow */
function AnimatedInput({ icon: Icon, delay = 0, ...props }) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className="relative"
      style={{ animation: `fade-up 0.4s ease-out ${delay}s both` }}
    >
      {/* Focus glow ring */}
      <div
        className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/40 to-secondary/40 transition-opacity duration-300"
        style={{ opacity: focused ? 1 : 0 }}
      />
      <div className="relative">
        <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${focused ? 'text-primary-light' : 'text-gray-500'}`} />
        <input
          {...props}
          onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
          onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
          className={`w-full pl-11 ${props.className || 'pr-4'} py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors`}
        />
      </div>
    </div>
  )
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showMFA, setShowMFA] = useState(false)
  const [mfaCode, setMfaCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [shakeForm, setShakeForm] = useState(false)
  const mfaRefs = useRef([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowMFA(true)
    }, 800)
  }

  const handleMFA = (e) => {
    e.preventDefault()
    if (mfaCode.length < 6) {
      setShakeForm(true)
      setTimeout(() => setShakeForm(false), 500)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Login successful! (Demo)')
    }, 800)
  }

  // MFA Screen
  if (showMFA) {
    return (
      <div style={{ animation: 'scale-in 0.4s ease-out both' }}>
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
            style={{ animation: 'bounce-in 0.6s ease-out both' }}
          >
            <FaShieldAlt className="text-2xl text-primary-light" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out 0.15s both' }}>
            Two-Factor Authentication
          </h1>
          <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.25s both' }}>
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>

        <form
          onSubmit={handleMFA}
          className="space-y-5"
          style={{ animation: shakeForm ? 'shake 0.4s ease-in-out' : undefined }}
        >
          <div style={{ animation: 'fade-up 0.4s ease-out 0.35s both' }}>
            <label className="block text-sm text-gray-400 mb-1.5">Verification Code</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => (mfaRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={mfaCode[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    const newCode = mfaCode.split('')
                    newCode[i] = val
                    setMfaCode(newCode.join(''))
                    if (val && mfaRefs.current[i + 1]) {
                      mfaRefs.current[i + 1].focus()
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !mfaCode[i] && mfaRefs.current[i - 1]) {
                      mfaRefs.current[i - 1].focus()
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className={`w-full aspect-square max-w-[52px] text-center text-xl font-bold rounded-xl bg-dark-light border text-white focus:outline-none transition-all duration-200 ${
                    mfaCode[i] ? 'border-primary/50 shadow-sm shadow-primary/10' : 'border-white/10'
                  } focus:border-primary/60 focus:shadow-md focus:shadow-primary/15`}
                  style={{ animation: `fade-up 0.3s ease-out ${0.4 + i * 0.05}s both` }}
                />
              ))}
            </div>
          </div>

          {/* Code completeness indicator */}
          <div className="flex gap-1" style={{ animation: 'fade-up 0.3s ease-out 0.7s both' }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${mfaCode[i] ? 'bg-primary' : 'bg-white/10'}`}
              />
            ))}
          </div>

          <div style={{ animation: 'fade-up 0.4s ease-out 0.75s both' }}>
            <RippleButton
              disabled={mfaCode.length < 6 || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : 'Verify & Sign In'}
            </RippleButton>
          </div>

          <div className="text-center space-y-2" style={{ animation: 'fade-up 0.4s ease-out 0.85s both' }}>
            <button type="button" className="text-sm text-gray-400 hover:text-primary-light transition-colors">
              Use backup code instead
            </button>
            <br />
            <button type="button" onClick={() => { setShowMFA(false); setMfaCode('') }} className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to login
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Main Login
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out both' }}>
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.1s both' }}>
          Sign in to manage your AI agents and dashboard.
        </p>
      </div>

      {/* OAuth — staggered reveal */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {oauthProviders.map((provider, i) => (
          <button
            key={provider.name}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${provider.color}`}
            style={{ animation: `fade-up 0.4s ease-out ${0.15 + i * 0.07}s both` }}
          >
            {provider.icon}
            <span className="hidden sm:inline">{provider.name}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6" style={{ animation: 'fade-up 0.3s ease-out 0.35s both' }}>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500 uppercase tracking-wider">or continue with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div style={{ animation: 'fade-up 0.4s ease-out 0.4s both' }}>
          <label className="block text-sm text-gray-400 mb-1.5">Email Address</label>
          <AnimatedInput
            icon={FaEnvelope}
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            delay={0}
          />
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.5s both' }}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm text-gray-400">Password</label>
            <Link to="/forgot-password" className="text-xs text-primary-light hover:text-primary transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <AnimatedInput
              icon={FaLock}
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="pr-12"
              delay={0}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2" style={{ animation: 'fade-up 0.4s ease-out 0.55s both' }}>
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded bg-dark-light border-white/20 text-primary focus:ring-primary/50 accent-primary"
          />
          <label htmlFor="remember" className="text-sm text-gray-400">Remember me for 30 days</label>
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.6s both' }}>
          <RippleButton
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? <Spinner /> : 'Sign In'}
          </RippleButton>
        </div>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-400 mt-6" style={{ animation: 'fade-up 0.4s ease-out 0.7s both' }}>
        {"Don't have an account? "}
        <Link to="/signup" className="text-primary-light hover:text-white font-medium transition-colors">
          Sign up free
        </Link>
      </p>
    </div>
  )
}
