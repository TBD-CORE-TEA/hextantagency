import { Link } from 'react-router-dom'

export function SectionHeading({ tag, title, description, center = true }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-12 lg:mb-16`}>
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h2>
      {description && <p className="text-gray-400 text-lg">{description}</p>}
    </div>
  )
}

export function Card({ icon, title, description, className = '' }) {
  return (
    <div className={`p-6 lg:p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
          <span className="text-2xl text-primary-light">{icon}</span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}

export function CTAButton({ to, children, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5'
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/25',
    secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    accent: 'bg-gradient-to-r from-secondary to-secondary-light text-dark font-bold hover:shadow-lg hover:shadow-secondary/25',
  }

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    )
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function StatCard({ value, label }) {
  return (
    <div className="text-center p-4">
      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

export function PageHero({ tag, title, description, children }) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {tag && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-6">
            {tag}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
