import { FaChartLine, FaHeadset, FaSearch, FaCogs, FaIndustry, FaHospital, FaGavel, FaShoppingCart, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { PageHero, SectionHeading, CTAButton } from '../components/UI'

const solutions = [
  {
    icon: <FaChartLine />,
    title: 'Sales Agents',
    description: 'Automate prospecting, lead qualification, follow-ups, and pipeline management with agents that work around the clock.',
    capabilities: ['Lead scoring & qualification', 'Automated outreach sequences', 'CRM data enrichment', 'Meeting scheduling', 'Pipeline analytics'],
    color: 'from-blue-500/20 to-primary/20',
  },
  {
    icon: <FaHeadset />,
    title: 'Customer Support Agents',
    description: 'Deliver instant, accurate support across channels. Handle tickets, resolve issues, and escalate intelligently.',
    capabilities: ['Multi-channel support', 'Ticket classification & routing', 'Knowledge base search', 'Sentiment detection', 'Human escalation'],
    color: 'from-secondary/20 to-emerald-500/20',
  },
  {
    icon: <FaSearch />,
    title: 'Research Agents',
    description: 'Gather, synthesize, and analyze information from multiple sources. Produce reports, summaries, and competitive insights.',
    capabilities: ['Market research', 'Competitive intelligence', 'Data aggregation', 'Report generation', 'Trend analysis'],
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    icon: <FaCogs />,
    title: 'Operations & Automation Agents',
    description: 'Automate repetitive workflows, coordinate between systems, and optimize operational efficiency.',
    capabilities: ['Workflow automation', 'Data processing', 'System orchestration', 'Inventory management', 'Process optimization'],
    color: 'from-primary/20 to-accent/20',
  },
]

const industries = [
  { icon: <FaShoppingCart />, name: 'E-Commerce', desc: 'Product recommendations, order tracking, customer service automation' },
  { icon: <FaHospital />, name: 'Healthcare', desc: 'Patient intake, appointment scheduling, medical record processing' },
  { icon: <FaGavel />, name: 'Legal', desc: 'Document review, contract analysis, compliance monitoring' },
  { icon: <FaIndustry />, name: 'Manufacturing', desc: 'Supply chain optimization, quality control, predictive maintenance' },
]

export default function Solutions() {
  return (
    <>
      <PageHero
        tag="Solutions"
        title={<>AI Agents for Every <span className="gradient-text">Use Case</span></>}
        description="Whether you need to scale sales, automate support, or streamline operations — we have an agent for that."
      />

      {/* Solutions */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {solutions.map((sol, i) => (
            <div key={sol.title} className="rounded-2xl bg-surface border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-300">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Info */}
                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center`}>
                      <span className="text-2xl text-primary-light">{sol.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{sol.title}</h3>
                  </div>
                  <p className="text-gray-400 text-lg mb-6">{sol.description}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {sol.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-gray-300 text-sm">
                        <FaCheckCircle className="text-secondary flex-shrink-0 text-xs" /> {cap}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Visual */}
                <div className={`lg:col-span-2 bg-gradient-to-br ${sol.color} p-8 flex items-center justify-center min-h-[200px]`}>
                  <span className="text-7xl opacity-20">{sol.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Industries"
            title="Industry-Specific Solutions"
            description="We build agents that understand the language, regulations, and workflows of your industry."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-primary-light">{ind.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{ind.name}</h3>
                <p className="text-gray-400 text-sm">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Don't See Your Use Case?</h2>
          <p className="text-gray-400 text-lg mb-8">
            We build custom agents for unique business challenges. Let's explore what's possible.
          </p>
          <CTAButton to="/contact" variant="primary">
            Talk to an Expert <FaArrowRight />
          </CTAButton>
        </div>
      </section>
    </>
  )
}
