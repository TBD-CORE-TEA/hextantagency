import { FaArrowRight, FaCheckCircle, FaUserShield, FaLock, FaEye } from 'react-icons/fa'
import { HiLightningBolt, HiShieldCheck, HiCube, HiCog, HiChip, HiRefresh } from 'react-icons/hi'
import { PageHero, SectionHeading, CTAButton } from '../components/UI'
import { Reveal, StaggerChildren, AnimatedBorder, FloatingParticles } from '../components/Animated'

const lifecycle = [
	{
		step: '01',
		icon: <HiCube />,
		title: 'Discovery & Strategy',
		description:
			'We analyze your workflows, data, and goals to define the ideal agent architecture and success metrics.',
		color: 'border-primary/40',
	},
	{
		step: '02',
		icon: <HiChip />,
		title: 'Agent Design & Prototyping',
		description:
			'Rapid prototyping with iterative feedback. You see agent behavior before committing to full development.',
		color: 'border-blue-500/40',
	},
	{
		step: '03',
		icon: <HiCog />,
		title: 'Development & Integration',
		description:
			'We build production-grade agents, connect them to your systems, and train them on your domain data.',
		color: 'border-secondary/40',
	},
	{
		step: '04',
		icon: <HiLightningBolt />,
		title: 'Testing & Validation',
		description:
			'Rigorous testing including edge cases, stress tests, and safety evaluations before any live deployment.',
		color: 'border-amber-500/40',
	},
	{
		step: '05',
		icon: <HiShieldCheck />,
		title: 'Deployment & Monitoring',
		description:
			'Go live with real-time monitoring, alerting, and human-in-the-loop controls for safe operation.',
		color: 'border-accent/40',
	},
	{
		step: '06',
		icon: <HiRefresh />,
		title: 'Optimization & Evolution',
		description:
			'Continuous improvement through performance analysis, model updates, and expanding agent capabilities.',
		color: 'border-emerald-500/40',
	},
]

const hitlFeatures = [
	{
		icon: <FaUserShield />,
		title: 'Approval Workflows',
		description:
			'Agents can pause for human approval on high-stakes decisions before taking action.',
	},
	{
		icon: <FaEye />,
		title: 'Transparent Reasoning',
		description:
			'See exactly why an agent made each decision, with full audit trails and reasoning chains.',
	},
	{
		icon: <FaLock />,
		title: 'Override Controls',
		description:
			"Humans can override, correct, or redirect agents at any time. You're always in control.",
	},
]

const security = [
	'SOC 2 Type II compliance',
	'End-to-end encryption (AES-256)',
	'Role-based access control (RBAC)',
	'Data residency options',
	'Regular penetration testing',
	'GDPR & CCPA compliance',
	'Audit logging & monitoring',
	'Secure model deployment',
]

const deploymentSteps = [
	{
		phase: 'Week 1–2',
		title: 'Discovery',
		items: ['Requirements gathering', 'Data assessment', 'Architecture design'],
	},
	{
		phase: 'Week 3–5',
		title: 'Build',
		items: ['Agent development', 'Integration setup', 'Initial training'],
	},
	{
		phase: 'Week 6–7',
		title: 'Test',
		items: ['QA testing', 'User acceptance', 'Safety validation'],
	},
	{
		phase: 'Week 8',
		title: 'Launch',
		items: ['Production deployment', 'Monitoring setup', 'Team training'],
	},
]

export default function HowItWorks() {
	return (
		<>
			<PageHero
				tag="How It Works"
				title={<>The Agent <span className="gradient-text">Lifecycle</span></>}
				description="From discovery to deployment and beyond — here's how we build AI agents that deliver real results."
			/>

			{/* Lifecycle */}
			<section className="py-16 sm:py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeading tag="Process" title="End-to-End Agent Lifecycle" />
					<StaggerChildren stagger={0.1} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{lifecycle.map((step) => (
							<AnimatedBorder key={step.step}>
								<div className={`relative p-6 lg:p-8 border-l-4 ${step.color} rounded-r-2xl group`}>
									<span className="text-5xl font-black text-white/5 absolute top-4 right-4 group-hover:text-primary/10 transition-colors">{step.step}</span>
									<div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
										<span className="text-2xl text-primary-light">{step.icon}</span>
									</div>
									<h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
									<p className="text-gray-400">{step.description}</p>
								</div>
							</AnimatedBorder>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* Human-in-the-Loop */}
			<section className="relative py-16 sm:py-20 lg:py-28 bg-surface/30 overflow-hidden">
				<FloatingParticles count={10} />
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<Reveal direction="left">
							<div>
								<span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-light text-sm font-medium mb-4">
									Human-in-the-Loop
								</span>
								<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
									AI Power. <span className="gradient-text">Human Control.</span>
								</h2>
								<p className="text-gray-400 text-lg mb-8">
									Our agents are powerful, but you're always in charge. Every critical action can require human approval, and all agent reasoning is fully transparent.
								</p>
								<div className="space-y-6">
									{hitlFeatures.map((f, fi) => (
										<Reveal key={f.title} direction="left" delay={0.15 + fi * 0.1}>
											<div className="flex gap-4">
												<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
													<span className="text-lg text-primary-light">{f.icon}</span>
												</div>
												<div>
													<h4 className="text-white font-semibold mb-1">{f.title}</h4>
													<p className="text-gray-400 text-sm">{f.description}</p>
												</div>
											</div>
										</Reveal>
									))}
								</div>
							</div>
						</Reveal>
						<Reveal direction="right" delay={0.2}>
							<div className="rounded-2xl bg-surface border border-white/5 p-8">
								<div className="space-y-4">
									{['Agent identifies opportunity', 'Agent drafts response', 'Human reviews & approves', 'Agent executes action', 'Results logged & tracked'].map((stepText, i) => (
										<Reveal key={i} direction="right" delay={0.3 + i * 0.08}>
											<div className="flex items-center gap-4">
												<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 2 ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary-light'}`}>
													{i + 1}
												</div>
												<span className={`text-sm ${i === 2 ? 'text-secondary font-medium' : 'text-gray-300'}`}>{stepText}</span>
												{i === 2 && <span className="ml-auto text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">Human Step</span>}
											</div>
										</Reveal>
									))}
								</div>
							</div>
						</Reveal>
					</div>
				</div>
			</section>

			{/* Security */}
			<section className="py-16 sm:py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeading
						tag="Security"
						title="Enterprise-Grade Security & Control"
						description="Your data and operations are protected by industry-leading security measures."
					/>
					<StaggerChildren stagger={0.08} direction="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{security.map((item) => (
							<div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/20 transition-all duration-300">
								<FaCheckCircle className="text-secondary flex-shrink-0" />
								<span className="text-gray-300 text-sm">{item}</span>
							</div>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* Deployment Timeline */}
			<section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeading
						tag="Timeline"
						title="Typical Deployment Flow"
						description="Most agents go from concept to production within 8 weeks."
					/>
					<StaggerChildren stagger={0.15} direction="left" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{deploymentSteps.map((d, i) => (
							<div key={d.phase} className="relative">
								{i < deploymentSteps.length - 1 && (
									<div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
								)}
								<AnimatedBorder>
									<div className="p-6">
										<span className="text-sm font-medium text-primary-light">{d.phase}</span>
										<h4 className="text-xl font-bold text-white mt-2 mb-4">{d.title}</h4>
										<ul className="space-y-2">
											{d.items.map((item) => (
												<li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
													<span className="w-1.5 h-1.5 rounded-full bg-secondary" /> {item}
												</li>
											))}
										</ul>
									</div>
								</AnimatedBorder>
							</div>
						))}
					</StaggerChildren>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 sm:py-20 lg:py-28">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<Reveal direction="up">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
						<p className="text-gray-400 text-lg mb-8">See how we can build the perfect AI agent for your business.</p>
						<CTAButton to="/contact" variant="primary" magnetic>
							Book a Free Consultation <FaArrowRight />
						</CTAButton>
					</Reveal>
				</div>
			</section>
		</>
	)
}
