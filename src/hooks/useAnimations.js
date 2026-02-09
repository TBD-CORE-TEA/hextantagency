import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Scroll-triggered reveal animation using IntersectionObserver.
 * Returns a ref to attach and whether the element is visible.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

/**
 * Animated counter — counts from 0 to target value when visible.
 */
export function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 })

  useEffect(() => {
    if (!isVisible || hasStarted) return
    setHasStarted(true)

    const numericTarget = parseFloat(target.toString().replace(/[^0-9.]/g, ''))
    if (isNaN(numericTarget)) {
      setCount(target)
      return
    }

    const startTime = performance.now()
    const isFloat = target.toString().includes('.')

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numericTarget

      setCount(isFloat ? current.toFixed(1) : Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericTarget)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration, hasStarted])

  return [ref, count]
}

/**
 * Mouse parallax — element moves subtly opposite to cursor position.
 */
export function useMouseParallax(intensity = 0.02) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * intensity * 100
      const y = (clientY / innerHeight - 0.5) * intensity * 100
      el.style.transform = `translate(${x}px, ${y}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return ref
}

/**
 * Magnetic button — element pulls toward cursor on hover.
 */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.15s ease-out'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [strength])

  return ref
}

/**
 * Tilt card — 3D perspective tilt on hover.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const tiltX = (y - 0.5) * maxTilt * -1
      const tiltY = (x - 0.5) * maxTilt
      el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    el.style.transition = 'transform 0.3s ease-out'
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt])

  return ref
}

/**
 * Typing animation — types text one character at a time.
 */
export function useTypewriter(text, speed = 50, startDelay = 300) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 })

  useEffect(() => {
    if (!isVisible) return

    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1))
          i++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [isVisible, text, speed, startDelay])

  return [ref, displayText, isComplete]
}
