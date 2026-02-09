import { useRef, useEffect, useState, useMemo } from 'react'
import { useScrollReveal, useTilt } from '../hooks/useAnimations'

/**
 * ScrollReveal — animates children in when they scroll into view.
 * Supports multiple animation directions and stagger delays.
 */
export function Reveal({
  children,
  direction = 'up', // up, down, left, right, scale, none
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
}) {
  const [ref, isVisible] = useScrollReveal({ once })

  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
    scale: 'scale(0.9)',
    none: 'none',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction],
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}

/**
 * StaggerChildren — reveals children one-by-one with a delay.
 */
export function StaggerChildren({ children, stagger = 0.1, direction = 'up', className = '' }) {
  const [ref, isVisible] = useScrollReveal()

  const transforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)',
    scale: 'scale(0.95)',
  }

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : transforms[direction],
                transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}s`,
                willChange: 'opacity, transform',
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}

/**
 * TiltCard — 3D tilt effect on hover with glow.
 */
export function TiltCard({ children, className = '', glowColor = 'rgba(108, 63, 227, 0.15)' }) {
  const tiltRef = useTilt(6)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={tiltRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight glow following cursor */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 rounded-full"
        style={{
          width: 250,
          height: 250,
          left: mousePos.x - 125,
          top: mousePos.y - 125,
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * FloatingParticles — decorative animated dots/shapes.
 */
export function FloatingParticles({ count = 20, className = '' }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    })), [count]
  )

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary-light"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * GlowingOrb — animated glowing background orb.
 */
export function GlowingOrb({ color = 'primary', size = 400, className = '' }) {
  const colors = {
    primary: 'bg-primary/15',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10',
  }

  return (
    <div
      className={`absolute rounded-full blur-[120px] ${colors[color]} ${className}`}
      style={{
        width: size,
        height: size,
        animation: 'orb-drift 15s ease-in-out infinite',
      }}
    />
  )
}

/**
 * AnimatedBorder — gradient border that rotates on hover.
 */
export function AnimatedBorder({ children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0"
        style={{
          background: isHovered
            ? 'linear-gradient(var(--border-angle, 0deg), #6C3FE3, #06D6A0, #F72585, #6C3FE3)'
            : 'linear-gradient(135deg, rgba(108,63,227,0.3), rgba(6,214,160,0.1))',
          animation: isHovered ? 'rotate-border 3s linear infinite' : 'none',
        }}
      />
      <div className="relative bg-surface rounded-2xl">{children}</div>
    </div>
  )
}

/**
 * TextShimmer — shimmering text highlight effect.
 */
export function TextShimmer({ children, className = '' }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #8B5CF6 0%, #06D6A0 45%, #8B5CF6 55%, #06D6A0 100%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer-text 5s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  )
}

/**
 * PulseRing — animated ring that pulses outward.
 */
export function PulseRing({ size = 80, color = 'primary', className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className={`absolute inset-0 rounded-full border-2 border-${color}/30`}
        style={{ animation: 'pulse-ring 2s ease-out infinite' }}
      />
      <div
        className={`absolute inset-0 rounded-full border-2 border-${color}/20`}
        style={{ animation: 'pulse-ring 2s ease-out 0.5s infinite' }}
      />
      <div
        className={`absolute inset-0 rounded-full border-2 border-${color}/10`}
        style={{ animation: 'pulse-ring 2s ease-out 1s infinite' }}
      />
    </div>
  )
}
