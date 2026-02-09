import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCheck, FaCheckCircle } from 'react-icons/fa'
import { useMagnetic } from '../hooks/useAnimations'

const passwordChecks = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p) => /\d/.test(p) },
  { label: 'One special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

/** Spinner */
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

/** Ripple button */
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

/** Animated input with focus glow */
function AnimatedInput({ icon: Icon, children, ...props }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
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
          className={`w-full pl-11 ${props.className || 'pr-4'} py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors`}
        />
        {children}
      </div>
    </div>
  )
}

/** Password strength bar */
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

/** Confetti */
function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i, x: 50 + (Math.random() - 0.5) * 60, delay: Math.random() * 0.5, duration: 1 + Math.random() * 1,
      color: ['#6C3FE3', '#06D6A0', '#F72585', '#8B5CF6', '#34E8B8'][i % 5], size: 4 + Math.random() * 4,
    })), []
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: '30%', width: p.size, height: p.size, backgroundColor: p.color, animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s both` }} />
      ))}
    </div>
  )
}

/** Animated step progress */
function StepProgress({ currentStep, totalSteps = 4 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
              i + 1 < currentStep ? 'bg-secondary text-white' :
              i + 1 === currentStep ? 'bg-primary text-white scale-110' :
              'bg-white/10 text-gray-500'
            }`}
          >
            {i + 1 < currentStep ? <FaCheck className="text-[9px]" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-6 h-0.5 rounded-full transition-all duration-500 ${i + 1 < currentStep ? 'bg-secondary' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [shakeForm, setShakeForm] = useState(false)
  const codeRefs = useRef([])

  const handleSendCode = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(2) }, 800)
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    if (code.length < 6) {
      setShakeForm(true)
      setTimeout(() => setShakeForm(false), 500)
      return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 800)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(4) }, 800)
  }

  // Step 4: Success
  if (step === 4) {
    return (
      <div className="relative" style={{ animation: 'scale-in 0.5s ease-out both' }}>
        <Confetti />
        <div className="text-center relative">
          <StepProgress currentStep={5} />
          <div
            className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-6"
            style={{ animation: 'bounce-in 0.6s ease-out 0.2s both' }}
          >
            <FaCheckCircle className="text-3xl text-secondary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ animation: 'fade-up 0.4s ease-out 0.35s both' }}>
            Password Reset!
          </h1>
          <p className="text-gray-400 mb-8" style={{ animation: 'fade-up 0.4s ease-out 0.45s both' }}>
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <div style={{ animation: 'fade-up 0.4s ease-out 0.55s both' }}>
            <Link
              to="/login"
              className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-center hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: New Password
  if (step === 3) {
    const allValid = passwordChecks.every((c) => c.test(password))
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

    return (
      <div style={{ animation: 'slide-in-right 0.4s ease-out both' }}>
        <div className="text-center mb-8">
          <StepProgress currentStep={3} />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out both' }}>
            Set New Password
          </h1>
          <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.1s both' }}>
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div style={{ animation: 'fade-up 0.4s ease-out 0.2s both' }}>
            <label className="block text-sm text-gray-400 mb-1.5">New Password</label>
            <div className="relative">
              <AnimatedInput
                icon={FaLock}
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="pr-12"
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </AnimatedInput>
            </div>

            <PasswordStrengthBar password={password} />

            {password && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                {passwordChecks.map((check, ci) => (
                  <div key={check.label} className="flex items-center gap-1.5" style={{ animation: `fade-up 0.3s ease-out ${ci * 0.05}s both` }}>
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${check.test(password) ? 'bg-secondary/20' : 'bg-white/5'}`}>
                      <FaCheck className={`text-[7px] transition-all duration-300 ${check.test(password) ? 'text-secondary scale-100' : 'text-gray-600 scale-0'}`} />
                    </div>
                    <span className={`text-[11px] transition-colors duration-300 ${check.test(password) ? 'text-gray-300' : 'text-gray-600'}`}>{check.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ animation: 'fade-up 0.4s ease-out 0.3s both' }}>
            <label className="block text-sm text-gray-400 mb-1.5">Confirm Password</label>
            <AnimatedInput
              icon={FaLock}
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="pr-12"
            >
              {confirmPassword && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                  {passwordsMatch ? (
                    <FaCheck className="text-secondary text-sm" style={{ animation: 'scale-in 0.2s ease-out both' }} />
                  ) : (
                    <span className="text-red-400 text-xs">No match</span>
                  )}
                </span>
              )}
            </AnimatedInput>
          </div>

          <div style={{ animation: 'fade-up 0.4s ease-out 0.4s both' }}>
            <RippleButton
              disabled={!allValid || !passwordsMatch || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : 'Reset Password'}
            </RippleButton>
          </div>
        </form>
      </div>
    )
  }

  // Step 2: Code Verification
  if (step === 2) {
    return (
      <div style={{ animation: 'slide-in-right 0.4s ease-out both' }}>
        <div className="text-center mb-8">
          <StepProgress currentStep={2} />
          <div
            className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
            style={{ animation: 'bounce-in 0.6s ease-out both' }}
          >
            <FaEnvelope className="text-2xl text-primary-light" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out 0.15s both' }}>
            Check Your Email
          </h1>
          <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.25s both' }}>
            {"We've sent a 6-digit code to "}
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <form
          onSubmit={handleVerifyCode}
          className="space-y-5"
          style={{ animation: shakeForm ? 'shake 0.4s ease-in-out' : undefined }}
        >
          <div style={{ animation: 'fade-up 0.4s ease-out 0.35s both' }}>
            <label className="block text-sm text-gray-400 mb-1.5">Verification Code</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => (codeRefs.current[i] = el)}
                  type="text"
                  maxLength={1}
                  value={code[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    const newCode = code.split('')
                    newCode[i] = val
                    setCode(newCode.join(''))
                    if (val && codeRefs.current[i + 1]) codeRefs.current[i + 1].focus()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !code[i] && codeRefs.current[i - 1]) codeRefs.current[i - 1].focus()
                  }}
                  onFocus={(e) => e.target.select()}
                  className={`w-full aspect-square max-w-[52px] text-center text-xl font-bold rounded-xl bg-dark-light border text-white focus:outline-none transition-all duration-200 ${
                    code[i] ? 'border-primary/50 shadow-sm shadow-primary/10' : 'border-white/10'
                  } focus:border-primary/60 focus:shadow-md focus:shadow-primary/15`}
                  style={{ animation: `fade-up 0.3s ease-out ${0.4 + i * 0.05}s both` }}
                />
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1" style={{ animation: 'fade-up 0.3s ease-out 0.7s both' }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${code[i] ? 'bg-primary' : 'bg-white/10'}`} />
            ))}
          </div>

          <div style={{ animation: 'fade-up 0.4s ease-out 0.75s both' }}>
            <RippleButton
              disabled={code.length < 6 || loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Spinner /> : 'Verify Code'}
            </RippleButton>
          </div>

          <div className="text-center space-y-2" style={{ animation: 'fade-up 0.4s ease-out 0.85s both' }}>
            <button type="button" className="text-sm text-gray-400 hover:text-primary-light transition-colors">
              Resend code
            </button>
            <br />
            <button type="button" onClick={() => { setStep(1); setCode('') }} className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Try a different email
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Step 1: Enter Email
  return (
    <div style={{ animation: 'fade-up 0.4s ease-out both' }}>
      <div className="text-center mb-8">
        <StepProgress currentStep={1} />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ animation: 'fade-up 0.4s ease-out 0.1s both' }}>
          Reset Your Password
        </h1>
        <p className="text-gray-400 text-sm" style={{ animation: 'fade-up 0.4s ease-out 0.2s both' }}>
          {"Enter your email and we'll send you a verification code."}
        </p>
      </div>

      <form onSubmit={handleSendCode} className="space-y-4">
        <div style={{ animation: 'fade-up 0.4s ease-out 0.3s both' }}>
          <label className="block text-sm text-gray-400 mb-1.5">Email Address</label>
          <AnimatedInput
            icon={FaEnvelope}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>

        <div style={{ animation: 'fade-up 0.4s ease-out 0.4s both' }}>
          <RippleButton
            disabled={!email || loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Spinner /> : 'Send Reset Code'}
          </RippleButton>
        </div>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6" style={{ animation: 'fade-up 0.4s ease-out 0.5s both' }}>
        <Link to="/login" className="inline-flex items-center gap-2 text-primary-light hover:text-white font-medium transition-colors">
          <FaArrowLeft className="text-xs" /> Back to Sign In
        </Link>
      </p>
    </div>
  )
}
