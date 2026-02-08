import { FaQuoteLeft, FaArrowRight, FaChartLine, FaHeadset, FaSearch, FaCogs } from 'react-icons/fa'
import { PageHero, CTAButton, SectionHeading } from '../components/UI'

const caseStudies = [
  {
    icon: <FaChartLine />,
    client: 'TechScale SaaS',
    industry: 'B2B Software',
    problem: 'Sales team was overwhelmed with lead qualification. Only 15% of inbound leads were being followed up within 24 hours, resulting in missed opportunities and a leaking pipeline.',
    solution: 'We deployed a Sales Agent that automatically scores, qualifies, and routes inbound leads. The agent handles initial outreach, books meetings, and enriches CRM data in real time.',
    results: [
      { metric: '340%', label: 'Increase in lead response rate' },
      { metric: '52%', label: 'Reduction in sales cycle length' },
      { metric: '$2.1M', label: 'Additional pipeline generated in 6 months' },
    ],
    testimonial: { text: 'The AI agent handles what used to take 3 SDRs. Our team now focuses on closing, not chasing.', author: 'Sarah Chen', role: 'VP of Sales, TechScale' },
  },
  {
    icon: <FaHeadset />,
    client: 'RetailFlow',
    industry: 'E-Commerce',
    problem: 'Customer support tickets were growing 40% year-over-year. Average response time exceeded 4 hours, and CSAT scores were declining steadily.',
    solution: 'We built a Customer Support Agent that handles Tier 1 tickets across email, chat, and social media. The agent resolves common issues instantly and escalates complex cases with full context.',
    results: [
      { metric: '78%', label: 'Tickets resolved without human intervention' },
      { metric: '< 30s', label: 'Average response time' },
      { metric: '94%', label: 'Customer satisfaction score' },
    ],
    testimonial: { text: 'Our customers get instant help, and our support team can finally focus on the cases that truly need a human touch.', author: 'Marcus Rivera', role: 'Head of CX, RetailFlow' },
  },
  {
    icon: <FaSearch />,
    client: 'Meridian Capital',
    industry: 'Financial Services',
    problem: 'Research analysts spent 60% of their time on data gathering and initial analysis, leaving little bandwidth for strategic insights and client deliverables.',
    solution: 'We deployed a Research Agent that monitors financial news, SEC filings, and market data. It produces automated daily briefs, flags anomalies, and drafts preliminary analysis reports.',
    results: [
      { metric: '70%', label: 'Reduction in data gathering time' },
      { metric: '4x', label: 'Increase in reports generated per analyst' },
      { metric: '98%', label: 'Data accuracy rate' },
    ],
    testimonial: { text: 'The research agent is like having a tireless junior analyst who never misses a data point. Our senior team can focus on what they do best.', author: 'Dr. Aisha Patel', role: 'Director of Research, Meridian Capital' },
  },
  {
    icon: <FaCogs />,
    client: 'LogiPrime',
    industry: 'Logistics',
    problem: 'Manual order processing and inventory reconciliation created bottlenecks. Errors averaged 8% per month, leading to delays and customer complaints.',
    solution: 'We built an Operations Agent that automates order processing, inventory tracking, and supplier communication. The agent reconciles data across systems and flags discrepancies for human review.',
    results: [
      { metric: '95%', label: 'Reduction in processing errors' },
      { metric: '60%', label: 'Faster order fulfillment' },
      { metric: '$800K', label: 'Annual cost savings' },
    ],
    testimonial: { text: 'What used to take our ops team an entire day now happens automatically before they even start their morning coffee.', author: 'James Ogilvie', role: 'COO, LogiPrime' },
  },
]

export default function CaseStudies() {
  return (
    <>
      <PageHero
        tag="Case Studies"
        title={<>Real Results from <span className="gradient-text">Real Clients</span></>}
        description="See how our AI agents are transforming businesses across industries with measurable, concrete outcomes."
      />

      {/* Case Studies */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {caseStudies.map((cs, i) => (
            <div key={cs.client} className="rounded-2xl bg-surface border border-white/5 overflow-hidden">
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-primary-light">{cs.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{cs.client}</h3>
                  <span className="text-sm text-gray-400">{cs.industry}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Problem / Solution */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-dark-light/50 border border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">The Challenge</span>
                    <p className="text-gray-300 leading-relaxed">{cs.problem}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-dark-light/50 border border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2 block">Our Solution</span>
                    <p className="text-gray-300 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {cs.results.map((r) => (
                    <div key={r.label} className="text-center p-5 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/5">
                      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{r.metric}</div>
                      <div className="text-gray-400 text-sm">{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="p-6 rounded-xl bg-dark-light/50 border border-white/5">
                  <FaQuoteLeft className="text-primary/30 text-2xl mb-3" />
                  <p className="text-gray-300 text-lg italic mb-4">{cs.testimonial.text}</p>
                  <div>
                    <span className="text-white font-semibold">{cs.testimonial.author}</span>
                    <span className="text-gray-500 text-sm ml-2">— {cs.testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Want Results Like These?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Book a free consultation and let's explore how AI agents can deliver measurable results for your business.
          </p>
          <CTAButton to="/contact" variant="accent">
            Book Your Free Demo <FaArrowRight />
          </CTAButton>
        </div>
      </section>
    </>
  )
}
