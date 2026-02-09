import { FaRobot, FaRocket, FaPlug, FaSyncAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { HiChartBar, HiShieldCheck, HiClock, HiSupport } from 'react-icons/hi'
import { PageHero, SectionHeading, CTAButton } from '../components/UI'
import { Reveal, StaggerChildren, TiltCard, AnimatedBorder, FloatingParticles } from '../components/Animated'

const services = [
	{
		icon: <FaRobot />,
		title: 'AI Agent Development',
		description:
			'Custom-built autonomous agents tailored to your business processes. We design, prototype, and engineer agents using state-of-the-art LLMs and agentic frameworks.',
		features: [
			'Custom agent architecture',
			'Multi-model orchestration',
			'Tool & API integration',
			'Domain-specific fine-tuning',
		],
	},
	{
		icon: <FaRocket />,
		title: 'Agent Deployment & Monitoring',
		description:
			'Production-grade deployment with real-time monitoring, alerting, and performance dashboards. Your agents run reliably at scale.',
		features: [
			'Cloud & on-premise deployment',
			'Real-time dashboards',
			'Performance analytics',
			'Automated scaling',
		],
	},
	{
		icon: <FaPlug />,
		title: 'Custom Integrations',
		description:
			'Seamlessly connect AI agents with your existing tech stack — CRM, ERP, communication platforms, databases, and more.',
		features: [
			'CRM & ERP integration',
			'API development',
			'Data pipeline setup',
			'Legacy system bridging',
		],
	},
	{
		icon: <FaSyncAlt />,
		title: 'Ongoing Optimization & Support',
		description:
			'Continuous improvement through performance analysis, prompt engineering, model updates, and proactive support.',
		features: [
			'Monthly performance reviews',
			'Prompt optimization',
			'Model upgrades',
			'Dedicated support team',
		],
	},
]

const benefits = [
	{
		icon: <HiChartBar />,
		title: 'Measurable ROI',
		description: 'Track agent performance with clear metrics tied to business outcomes.',
	},
	{
		icon: <HiShieldCheck />,
		title: 'Enterprise Security',
		description: 'SOC 2 compliant infrastructure with data encryption at rest and in transit.',
	},
	{
		icon: <HiClock />,
		title: 'Rapid Delivery',
		description: 'From concept to production in weeks, not months. Agile development sprints.',
	},
	{
		icon: <HiSupport />,
		title: '24/7 Reliability',
		description: 'Agents that never sleep, with human escalation paths when needed.',
	},
]

export default function Services() {
	return (
		<>
			<PageHero
				tag="Our Services"
				title={<>What We <span className="gradient-text">Deliver</span></>}
				description="End-to-end agentic AI solutions — from strategy and development to deployment, integration, and ongoing optimization."
			/>

			{/* Services Grid */}
			<section className="py-16 sm:py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="space-y-12 lg:space-y-20">
						{services.map((service, i) => (
							<Reveal key={service.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={0.1}>
								<div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
									<div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
										<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
											<span className="text-3xl text-primary-light">{service.icon}</span>
										</div>
										<h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{service.title}</h3>
										<p className="text-gray-400 text-lg mb-6 leading-relaxed">{service.description}</p>
										<ul className="space-y-3">
											{service.features.map((f, fi) => (
												<Reveal key={f} direction="left" delay={0.2 + fi * 0.08}>
													<li className="flex items-center gap-3 text-gray-300">
														<FaCheckCircle className="text-secondary flex-shrink-0" /> {f}
													</li>
												</Reveal>
											))}
										</ul>
									</div>
									<TiltCard className={`rounded-2xl ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
										<div className="rounded-2xl bg-surface border border-white/5 p-8 lg:p-12 flex items-center justify-center min-h-[260px]">
											<div className="text-center">
												<div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
													<span className="text-4xl text-primary-light">{service.icon}</span>
												</div>
												<p className="text-gray-500 text-sm">Illustration</p>
											</div>
										</div>
									</TiltCard>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="relative py-16 sm:py-20 lg:py-28 bg-surface/30 overflow-hidden">
				<FloatingParticles count={8} />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeading
						tag="Why Us"
						title="Built for Enterprise. Designed for Results."
						description="We combine deep AI expertise with battle-tested engineering to deliver agents that make a real impact."
					/>
					<StaggerChildren stagger={0.12} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{benefits.map((b) => (
							<AnimatedBorder key={b.title}>
								<div className="p-6 hover:-translate-y-1 transition-all duration-300 text-center group">
									<div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
										<span className="text-2xl text-primary-light">{b.icon}</span>
									</div>
									<h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
									<p className="text-gray-400 text-sm">{b.description}</p>
								</div>
							</AnimatedBorder>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 sm:py-20 lg:py-28">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<Reveal direction="up">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Need a Custom Solution?</h2>
						<p className="text-gray-400 text-lg mb-8">
							Tell us about your challenge and we'll design an agent strategy tailored to your needs.
						</p>
						<CTAButton to="/contact" variant="primary" magnetic>
							Let's Talk <FaArrowRight />
						</CTAButton>
					</Reveal>
				</div>
			</section>
		</>
	)
}
