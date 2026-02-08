import { Link } from 'react-router-dom'
import { FaRobot, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

const footerLinks = {
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ],
  Services: [
    { name: 'AI Agent Development', path: '/services' },
    { name: 'Deployment & Monitoring', path: '/services' },
    { name: 'Custom Integrations', path: '/services' },
    { name: 'Optimization & Support', path: '/services' },
  ],
  Solutions: [
    { name: 'Sales Agents', path: '/solutions' },
    { name: 'Support Agents', path: '/solutions' },
    { name: 'Research Agents', path: '/solutions' },
    { name: 'Operations Agents', path: '/solutions' },
  ],
  Legal: [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Data Processing', path: '/data-processing' },
    { name: 'AI Usage Policy', path: '/ai-usage-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-dark-light border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">
                Hextant<span className="gradient-text">Agency</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Building intelligent AI agents that transform how businesses operate, sell, and support their customers.
            </p>
            <div className="flex gap-3">
              {[FaLinkedin, FaTwitter, FaGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-gray-400">
            <a href="mailto:hello@hextantagency.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <HiMail /> hello@hextantagency.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <HiPhone /> +1 (234) 567-890
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HextantAgency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
