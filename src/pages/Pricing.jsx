import { useState } from 'react'
import { FaCheck, FaArrowRight, FaTimes } from 'react-icons/fa'
import { PageHero, CTAButton, SectionHeading } from '../components/UI'
import { Reveal, StaggerChildren, TiltCard, AnimatedBorder } from '../components/Animated'

const tiers = [
  {
    name: 'Starter',
    description: 'For teams exploring AI agents',
    price: '$2,500',
    period: '/month',
    popular: false,
    features: [
      { text: '1 AI Agent', included: true },
      { text: 'Up to 5,000 agent actions/mo', included: true },
      { text: 'Email & chat support', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Standard integrations', included: true },
      { text: 'Custom agent training', included: false },
      { text: 'Dedicated account manager', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Professional',
    description: 'For growing businesses',
    price: '$6,500',
    period: '/month',
    popular: true,
    features: [
      { text: 'Up to 5 AI Agents', included: true },
      { text: 'Up to 50,000 agent actions/mo', included: true },
      { text: 'Priority support (< 4h response)', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Custom agent training', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large-scale operations',
    price: 'Custom',
    period: '',
    popular: false,
    features: [
      { text: 'Unlimited AI Agents', included: true },
      { text: 'Unlimited agent actions', included: true },
      { text: '24/7 dedicated support', included: true },
      { text: 'Custom analytics & BI integration', included: true },
      { text: 'Any integration supported', included: true },
      { text: 'Advanced agent training & fine-tuning', included: true },
      { text: 'Dedicated success team', included: true },
      { text: '99.9% SLA guarantee', included: true },
    ],
  },
]

const addons = [
  { name: 'Additional Agent', price: '$1,200/mo', description: 'Add an extra agent to any plan' },
  { name: 'Extra Actions Pack', price: '$500/10K actions', description: 'When you exceed your monthly limit' },
  { name: 'Custom Model Fine-Tuning', price: '$5,000 one-time', description: 'Train on your proprietary data' },
  { name: 'On-Premise Deployment', price: 'Custom pricing', description: 'Deploy in your own infrastructure' },
  { name: 'Advanced Security Package', price: '$2,000/mo', description: 'HIPAA, SOX, or industry-specific compliance' },
  { name: 'Priority Onboarding', price: '$3,000 one-time', description: 'Dedicated onboarding within 1 week' },
]

const faqs = [
  { q: 'What counts as an "agent action"?', a: 'An agent action is any discrete task the agent performs — sending an email, querying a database, processing a document, making an API call, etc. Each meaningful step counts as one action.' },
  { q: 'Can I change plans at any time?', a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle. No lock-in contracts.' },
  { q: 'What happens if I exceed my action limit?', a: "You'll receive a notification at 80% usage. If you exceed your limit, additional actions are billed at a per-action rate, or you can purchase an Extra Actions Pack." },
  { q: 'Is there a free trial?', a: 'We offer a free proof-of-concept engagement for qualified businesses. Book a demo to discuss your needs and see if you qualify.' },
  { q: 'Do you offer annual discounts?', a: 'Yes. Annual billing saves 20% compared to monthly billing across all plans. Contact us for details.' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <PageHero
        tag="Pricing"
        title={<>Simple, Transparent <span className="gradient-text">Pricing</span></>}
        description="Choose the plan that fits your needs. Scale up as your agents deliver results."
      >
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${annual ? 'left-7' : 'left-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-gray-400'}`}>
            Annual <span className="text-secondary text-xs font-medium">Save 20%</span>
          </span>
        </div>
      </PageHero>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 lg:py-28 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren stagger={0.15} direction="up" className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <TiltCard key={tier.name} className="rounded-2xl" glowColor={tier.popular ? 'rgba(108, 63, 227, 0.2)' : 'rgba(108, 63, 227, 0.1)'}>
                <div
                  className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                    tier.popular
                      ? 'bg-gradient-to-b from-primary/10 to-surface border-2 border-primary/40 shadow-lg shadow-primary/10'
                      : 'bg-surface border border-white/5'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-xs font-bold">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 mb-6">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">
                      {tier.price === 'Custom'
                        ? 'Custom'
                        : annual
                        ? `$${Math.round(parseInt(tier.price.replace(/[^0-9]/g, '')) * 0.8).toLocaleString()}`
                        : tier.price}
                    </span>
                    {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
                  </div>
                  <CTAButton
                    to="/contact"
                    variant={tier.popular ? 'primary' : 'secondary'}
                    className="w-full mb-8"
                    magnetic={tier.popular}
                  >
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </CTAButton>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-3">
                        {f.included ? (
                          <FaCheck className="text-secondary mt-0.5 flex-shrink-0 text-sm" />
                        ) : (
                          <FaTimes className="text-gray-600 mt-0.5 flex-shrink-0 text-sm" />
                        )}
                        <span className={f.included ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Add-ons"
            title="Customize Your Plan"
            description="Enhance any tier with powerful add-ons to match your specific needs."
          />
          <StaggerChildren stagger={0.1} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <AnimatedBorder key={addon.name}>
                <div className="p-6 hover:bg-surface-light/30 transition-colors duration-300">
                  <h4 className="text-white font-semibold mb-1">{addon.name}</h4>
                  <span className="text-primary-light text-sm font-medium">{addon.price}</span>
                  <p className="text-gray-400 text-sm mt-2">{addon.description}</p>
                </div>
              </AnimatedBorder>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tag="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} direction="up" delay={i * 0.06}>
                <div className="rounded-xl bg-surface border border-white/5 overflow-hidden hover:border-primary/20 transition-all duration-300">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <span className={`text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                    <p className="px-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Not Sure Which Plan Is Right?</h2>
            <p className="text-gray-400 text-lg mb-8">Talk to our team and we'll recommend the best setup for your needs and budget.</p>
            <CTAButton to="/contact" variant="primary" magnetic>
              Talk to Sales <FaArrowRight />
            </CTAButton>
          </Reveal>
        </div>
      </section>
    </>
  )
}
