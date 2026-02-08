import { FaLinkedin, FaTwitter, FaArrowRight, FaBalanceScale, FaHeart, FaLightbulb, FaShieldAlt } from 'react-icons/fa'
import { HiEye, HiGlobe, HiSparkles } from 'react-icons/hi'
import { PageHero, SectionHeading, CTAButton } from '../components/UI'

const values = [
  { icon: <FaLightbulb />, title: 'Innovation First', description: 'We push the boundaries of what AI agents can do, staying ahead of the curve with cutting-edge research and technology.' },
  { icon: <FaBalanceScale />, title: 'Responsible AI', description: 'Every agent we build adheres to strict ethical guidelines. We believe powerful AI must be safe, fair, and transparent.' },
  { icon: <FaHeart />, title: 'Client-Centric', description: 'Your success is our success. We measure our impact by the tangible business outcomes we deliver for our clients.' },
  { icon: <FaShieldAlt />, title: 'Trust & Security', description: "Enterprise-grade security isn't optional — it's foundational. We protect your data as carefully as our own." },
]

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-Founder', bio: 'Former AI lead at a Fortune 500 tech company. 15+ years in AI/ML.', avatar: 'AR' },
  { name: 'Dr. Maya Chen', role: 'CTO & Co-Founder', bio: 'PhD in AI from MIT. Published researcher in multi-agent systems.', avatar: 'MC' },
  { name: 'Jordan Okafor', role: 'VP of Engineering', bio: 'Ex-Google. Expert in scalable AI infrastructure and MLOps.', avatar: 'JO' },
  { name: 'Priya Sharma', role: 'Head of AI Ethics', bio: 'Former AI policy advisor. Ensures all agents meet ethical standards.', avatar: 'PS' },
  { name: 'Tom Williams', role: 'Head of Sales', bio: '10+ years in enterprise SaaS sales. Passionate about AI adoption.', avatar: 'TW' },
  { name: 'Lisa Park', role: 'Head of Customer Success', bio: 'Dedicated to ensuring every client achieves maximum agent ROI.', avatar: 'LP' },
]

const ethics = [
  { title: 'Transparency', description: 'All agent decisions are explainable. Clients can inspect reasoning chains and understand why agents take specific actions.' },
  { title: 'Fairness', description: 'We rigorously test for and mitigate bias in agent behavior. Regular audits ensure equitable outcomes across all demographics.' },
  { title: 'Privacy', description: 'Data minimization by default. We only collect and process data that is strictly necessary for agent operation.' },
  { title: 'Human Oversight', description: 'Every agent operates with human-in-the-loop controls. Critical decisions always require human approval.' },
  { title: 'Safety', description: 'Agents include safety guardrails, content filters, and automatic shutdown mechanisms for edge cases.' },
  { title: 'Accountability', description: 'We take full responsibility for agent behavior. Clear liability frameworks and rapid incident response.' },
]

export default function About() {
  return (
    <>
      <PageHero
        tag="About Us"
        title={<>Building the Future of <span className="gradient-text">Intelligent Work</span></>}
        description="We're a team of AI researchers, engineers, and business strategists on a mission to make agentic AI accessible, safe, and transformative."
      />

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="p-8 rounded-2xl bg-surface border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <HiSparkles className="text-2xl text-primary-light" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                To empower businesses of every size with autonomous AI agents that handle the work that slows teams down — so humans can focus on strategy, creativity, and what matters most.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <HiEye className="text-2xl text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                A world where every business has access to intelligent AI agents that work alongside humans — amplifying capability, reducing toil, and unlocking new levels of productivity and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading tag="Values" title="What We Stand For" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-primary-light">{v.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Team"
            title="Meet the People Behind the Agents"
            description="A multidisciplinary team of AI experts, engineers, and business leaders."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 group text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 text-2xl font-bold text-white">
                  {member.avatar}
                </div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <span className="text-primary-light text-sm font-medium">{member.role}</span>
                <p className="text-gray-400 text-sm mt-3">{member.bio}</p>
                <div className="flex justify-center gap-3 mt-4">
                  {[FaLinkedin, FaTwitter].map((Icon, i) => (
                    <a key={i} href="#" className="text-gray-500 hover:text-primary-light transition-colors">
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Ethics */}
      <section className="py-16 sm:py-20 lg:py-28 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tag="AI Ethics"
            title="Our Commitment to Responsible AI"
            description="We believe that powerful AI agents must be built with strong ethical foundations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ethics.map((e) => (
              <div key={e.title} className="p-6 rounded-2xl bg-surface border border-white/5">
                <h4 className="text-lg font-semibold text-white mb-2">{e.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Want to Join Our Mission?</h2>
          <p className="text-gray-400 text-lg mb-8">We're always looking for talented people who are passionate about building the future of AI.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton to="/contact" variant="primary">
              Get in Touch <FaArrowRight />
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  )
}
