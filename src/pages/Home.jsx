import { Link } from 'react-router-dom'
import { FaRobot, FaBrain, FaChartLine, FaHeadset, FaSearch, FaCogs, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { HiLightningBolt, HiShieldCheck, HiCube, HiChip } from 'react-icons/hi'
import { SectionHeading, Card, CTAButton, StatCard } from '../components/UI'
import { Reveal, StaggerChildren, TiltCard, FloatingParticles, GlowingOrb, AnimatedBorder, TextShimmer, PulseRing } from '../components/Animated'
import { useMouseParallax, useTypewriter } from '../hooks/useAnimations'

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
  const parallaxRef = useMouseParallax(0.015)
  const [typewriterRef, typedText, isTypingDone] = useTypewriter('AI Agents That Actually Work For Your Business', 40, 500)

  return (
    <>
      {/* ───── HERO ───── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Floating Particles */}
        <FloatingParticles count={30} />

        {/* Animated Bg Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <GlowingOrb color="primary" size={600} className="top-1/4 left-1/2 -translate-x-1/2" />
          <GlowingOrb color="secondary" size={400} className="bottom-0 right-0" />
          <GlowingOrb color="accent" size={300} className="top-10 left-10" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <Reveal direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-6 border border-primary/20">
                  <HiChip className="text-lg animate-pulse-slow" /> Agentic AI Solutions
                </span>
              </Reveal>
              <Reveal direction="up" delay={0.25}>
                <h1 ref={typewriterRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                  <span>{typedText.split('Actually Work')[0]}</span>
                  {typedText.includes('Actually Work') && (
                    <TextShimmer>Actually Work</TextShimmer>
                  )}
                  <span>{typedText.includes('Actually Work') ? typedText.split('Actually Work')[1] : ''}</span>
                  {!isTypingDone && <span className="inline-block w-[3px] h-[1em] bg-primary-light ml-1 animate-pulse" />}
                </h1>
              </Reveal>
              <Reveal direction="up" delay={0.4}>
                <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl">
                  We design, build, and deploy autonomous AI agents that handle sales, support, research, and operations — so your team can focus on what matters.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.55}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton to="/contact" variant="primary" magnetic>
                    Book a Demo <FaArrowRight />
                  </CTAButton>
                  <CTAButton to="/how-it-works" variant="secondary">
                    See How It Works
                  </CTAButton>
                </div>
              </Reveal>

              {/* Trust bar */}
              <Reveal direction="up" delay={0.7}>
                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  {['SOC 2 Compliant', 'Enterprise-Ready', 'Human-in-the-Loop'].map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <FaCheckCircle className="text-secondary text-xs" /> {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Agent Visual with Parallax */}
            <Reveal direction="scale" delay={0.3}>
              <div ref={parallaxRef} className="relative hidden lg:flex items-center justify-center">
                <div className="animate-float">
                  {/* Central orb with pulse ring */}
                  <div className="relative w-72 h-72 xl:w-80 xl:h-80">
                    <PulseRing size={320} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl animate-pulse-slow" />
                    <div className="absolute inset-4 rounded-full bg-surface border border-white/10 flex items-center justify-center glow">
                      <FaRobot className="text-6xl text-primary-light" />
                    </div>
                    {/* Orbiting dots with animation */}
                    {[0, 72, 144, 216, 288].map((deg, i) => (
                      <div
                        key={i}
                        className="absolute w-10 h-10 rounded-xl bg-surface-light border border-white/10 flex items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 hover:border-primary/40"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${deg}deg) translateX(160px) rotate(-${deg}deg) translate(-50%, -50%)`,
                          animation: `fade-up 0.5s ease-out ${0.8 + i * 0.12}s both`,
                        }}
                      >
                        {[<FaChartLine key={0} />, <FaHeadset key={1} />, <FaCogs key={2} />, <FaSearch key={3} />, <FaBrain key={4} />][i]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
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
          <StaggerChildren stagger={0.12} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc) => (
              <TiltCard key={uc.title} className="rounded-2xl">
                <Card icon={uc.icon} title={uc.title} description={uc.description} />
              </TiltCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ───── HOW AGENTIC AI WORKS ───── */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-surface/30 overflow-hidden">
        <FloatingParticles count={10} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Agentic AI"
            title={<>How <TextShimmer>Agentic AI</TextShimmer> Works</>}
            description="Unlike simple chatbots, agentic AI systems reason, plan, use tools, and take autonomous actions — all while keeping humans in control."
          />
          <StaggerChildren stagger={0.1} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <AnimatedBorder key={step.step}>
                <div className="relative p-6 lg:p-8 group">
                  <span className="text-5xl font-black text-white/5 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <span className="text-2xl text-primary-light">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </AnimatedBorder>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
              <FloatingParticles count={12} />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark-light to-secondary/20" />
              <div className="absolute inset-0 bg-surface/80" />
              <div className="relative text-center max-w-2xl mx-auto">
                <Reveal direction="up" delay={0.15}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Ready to Put AI Agents to Work?
                  </h2>
                </Reveal>
                <Reveal direction="up" delay={0.3}>
                  <p className="text-gray-400 text-lg mb-8">
                    Book a free consultation and discover how autonomous AI agents can transform your business operations.
                  </p>
                </Reveal>
                <Reveal direction="up" delay={0.45}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <CTAButton to="/contact" variant="accent" magnetic>
                      Book a Demo <FaArrowRight />
                    </CTAButton>
                    <CTAButton to="/pricing" variant="secondary">
                      View Pricing
                    </CTAButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
