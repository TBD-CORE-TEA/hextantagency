import { useState } from 'react'
import { FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaCalendarAlt } from 'react-icons/fa'
import { PageHero } from '../components/UI'

const contactInfo = [
  { icon: <FaEnvelope />, label: 'Email', value: 'hello@hextantagency.com', href: 'mailto:hello@hextantagency.com' },
  { icon: <FaPhone />, label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
  { icon: <FaMapMarkerAlt />, label: 'Office', value: 'San Francisco, CA', href: '#' },
]

const interests = [
  'AI Agent Development',
  'Sales Automation',
  'Customer Support',
  'Research Agents',
  'Operations Automation',
  'Custom Integration',
  'Enterprise Solution',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <PageHero
        tag="Contact Us"
        title={<>Let's Build Your <span className="gradient-text">AI Agent</span></>}
        description="Book a free consultation or drop us a message. We'll get back to you within 24 hours."
      />

      <section className="py-16 sm:py-20 lg:py-28 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-secondary/30 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                    <FaArrowRight className="text-2xl text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                  <p className="text-gray-400 text-lg">We've received your message and will get back to you within 24 hours. Check your email for a confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-surface border border-white/5 space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Send Us a Message</h3>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">I'm Interested In</label>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-dark-light">Select an option</option>
                        {interests.map((opt) => (
                          <option key={opt} value={opt} className="bg-dark-light">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Monthly Budget</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option value="" className="bg-dark-light">Select range</option>
                        <option value="<$2,500" className="bg-dark-light">{'< $2,500'}</option>
                        <option value="$2,500-$5,000" className="bg-dark-light">$2,500 – $5,000</option>
                        <option value="$5,000-$10,000" className="bg-dark-light">$5,000 – $10,000</option>
                        <option value="$10,000+" className="bg-dark-light">$10,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-light border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Tell us about your project, challenges, and goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Send Message <FaArrowRight />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="p-6 rounded-2xl bg-surface border border-white/5">
                <h4 className="text-lg font-bold text-white mb-5">Contact Information</h4>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-center gap-4 text-gray-400 hover:text-secondary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-light">{info.icon}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">{info.label}</span>
                        <span className="text-sm text-gray-300">{info.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  {[FaLinkedin, FaTwitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary/20 transition-all">
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>

              {/* Book a Demo */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendarAlt className="text-primary-light text-xl" />
                  <h4 className="text-lg font-bold text-white">Book a Demo</h4>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Prefer a live walkthrough? Schedule a 30-minute demo with our team and see AI agents in action.
                </p>
                <button className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                  Schedule a Call
                </button>
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl bg-surface border border-white/5 text-center">
                <p className="text-gray-400 text-sm">
                  Average response time: <span className="text-white font-semibold">{'< 4 hours'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
