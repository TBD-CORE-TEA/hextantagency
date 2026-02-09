import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi'
import { FaRobot } from 'react-icons/fa'

const mainLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Pricing', path: '/pricing' },
]

const companyLinks = [
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'About Us', path: '/about' },
]

const allMobileLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'About Us', path: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { pathname } = useLocation()
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false)
    setOpen(false)
  }, [pathname])

  const isCompanyActive = companyLinks.some((l) => l.path === pathname)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaRobot className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-white">
              Hextant<span className="gradient-text">Agency</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.path
                    ? 'text-white bg-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Company Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isCompanyActive
                    ? 'text-white bg-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Company
                <HiChevronDown className={`text-xs transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute top-full right-0 mt-2 w-48 rounded-xl bg-dark-light border border-white/10 shadow-xl shadow-black/20 overflow-hidden transition-all duration-200 origin-top ${
                  dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
              >
                <div className="py-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === link.path
                          ? 'text-white bg-primary/15'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Log In
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6 pt-2 space-y-1 bg-dark-light/95 backdrop-blur-xl border-t border-white/5">
          {allMobileLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                pathname === link.path
                  ? 'text-white bg-primary/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-center px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-center px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
