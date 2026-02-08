import { Link } from 'react-router-dom'
import { FaRobot, FaBrain, FaChartLine, FaHeadset, FaSearch, FaCogs, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { HiLightningBolt, HiShieldCheck, HiCube, HiChip } from 'react-icons/hi'
import { SectionHeading, Card, CTAButton, StatCard } from '../components/UI'

const useCases = [
  { icon: <FaChartLine />, title: 'Sales Agents', description: 'Autonomous agents that prospect, qualify leads, and nurture pipelines 24/7 — boosting conversion while your team focuses on closing.' },
  { icon: <FaHeadset />, title: 'Customer Support', description: 'AI agents that resolve tickets, handle escalations, and deliver instant, accurate responses across every channel.' },
  { icon: <FaCogs />, title: 'Operations & Automation', description: 'Streamline workflows, automate repetitive tasks, and orchestrate complex processes without human bottlenecks.' },
  { icon: <FaSearch />, title: 'Research Agents', description: 'Intelligent agents that gather, synthesize, and report on market data, competitive intel, and industry trends.' },
]

const howItWorks = [
  { icon: <HiCube />, step: '01', title: 'Define Goals', description: 'We map your business objectives to agent capabilities and design the optimal AI architecture.' },
  { icon: <FaBrain />, step: '02', title: 'Build & Train', description: 'Our team builds custom agents using cutting-edge LLMs, fine-tuned for your specific domain and data.' },
  { icon: <HiLightningBolt />, step: '03', title: 'Deploy & Monitor', description: 'Agents go live with real-time monitoring, human-in-the-loop controls, and continuous optimization.' },
  { icon: <HiShieldCheck />, step: '04', title: 'Scale & Evolve', description: 'As your needs grow, agents learn and adapt — scaling autonomously while maintaining safety guardrails.' },
]

const stats = [
  { value: '95%', label: 'Task Completion Rate' },
  { value: '60%', label: 'Cost Reduction' },
  { value: '24/7', label: 'Uptime & Availability' },
  { value: '3x', label: 'Productivity Increase' },
]

export default function Home() {
  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Bg Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
          <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-6">
                <HiChip className="text-lg" /> Agentic AI Solutions
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                AI Agents That{' '}
                <span className="gradient-text">Actually Work</span>{' '}
                For Your Business
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl">
                We design, build, and deploy autonomous AI agents that handle sales, support, research, and operations — so your team can focus on what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton to="/contact" variant="primary">
                  Book a Demo <FaArrowRight />
                </CTAButton>
                <CTAButton to="/how-it-works" variant="secondary">
                  See How It Works
                </CTAButton>
              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                {['SOC 2 Compliant', 'Enterprise-Ready', 'Human-in-the-Loop'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-secondary text-xs" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Agent Visual */}
            <div className="relative hidden lg:flex items-center justify-center" style={{ animationDelay: '0.2s' }}>
              <div className="animate-float">
                {/* Central orb */}
                <div className="relative w-72 h-72 xl:w-80 xl:h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl animate-pulse-slow" />
                  <div className="absolute inset-4 rounded-full bg-surface border border-white/10 flex items-center justify-center">
                    <FaRobot className="text-6xl text-primary-light" />
                  </div>
                  {/* Orbiting dots */}
                  {[0, 72, 144, 216, 288].map((deg, i) => (
                    <div
                      key={i}
                      className="absolute w-10 h-10 rounded-xl bg-surface-light border border-white/10 flex items-center justify-center"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${deg}deg) translateX(160px) rotate(-${deg}deg) translate(-50%, -50%)`,
                      }}
                    >
                      {[<FaChartLine />, <FaHeadset />, <FaCogs />, <FaSearch />, <FaBrain />][i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="py-12 border-y border-white/5 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── USE CASES ───── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Use Cases"
            title="AI Agents for Every Business Function"
            description="From lead generation to customer support, our agents plug into your existing workflows and start delivering value on day one."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => (
              <Card key={uc.title} icon={uc.icon} title={uc.title} description={uc.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW AGENTIC AI WORKS ───── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Agentic AI"
            title={<>How <span className="gradient-text">Agentic AI</span> Works</>}
            description="Unlike simple chatbots, agentic AI systems reason, plan, use tools, and take autonomous actions — all while keeping humans in control."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative p-6 lg:p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-primary-light">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark-light to-secondary/20" />
            <div className="absolute inset-0 bg-surface/80" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Put AI Agents to Work?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Book a free consultation and discover how autonomous AI agents can transform your business operations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CTAButton to="/contact" variant="accent">
                  Book a Demo <FaArrowRight />
                </CTAButton>
                <CTAButton to="/pricing" variant="secondary">
                  View Pricing
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
