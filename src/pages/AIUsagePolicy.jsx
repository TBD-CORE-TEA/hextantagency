import { PageHero } from '../components/UI'

export default function AIUsagePolicy() {
  return (
    <>
      <PageHero
        tag="Legal"
        title="AI Usage Policy"
        description="Last updated: February 1, 2026"
      />
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 mb-8">
              <p className="text-gray-400 leading-relaxed">
                This AI Usage Policy outlines how HextantAgency develops, deploys, and governs AI agents. We are committed to responsible AI that is transparent, fair, safe, and aligned with human values.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. AI Agent Principles</h2>
              <p className="text-gray-400 leading-relaxed mb-3">All AI agents developed and deployed by HextantAgency adhere to the following core principles:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Transparency:</strong> All agent actions are logged, explainable, and auditable. Users can understand why an agent made a specific decision.</li>
                <li><strong className="text-gray-300">Fairness:</strong> Agents are rigorously tested for bias and designed to treat all individuals equitably regardless of protected characteristics.</li>
                <li><strong className="text-gray-300">Safety:</strong> Agents operate within defined guardrails with automatic safety mechanisms to prevent harmful actions.</li>
                <li><strong className="text-gray-300">Human Control:</strong> Critical decisions always require human approval. Agents can be paused, corrected, or shut down at any time.</li>
                <li><strong className="text-gray-300">Privacy:</strong> Agents process the minimum data necessary and adhere to all applicable data protection regulations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Permitted Use Cases</h2>
              <p className="text-gray-400 leading-relaxed mb-3">Our AI agents are designed for legitimate business purposes including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Sales prospecting, lead qualification, and pipeline management</li>
                <li>Customer support, ticket resolution, and service automation</li>
                <li>Market research, data analysis, and report generation</li>
                <li>Operational workflow automation and process optimization</li>
                <li>Document processing, data extraction, and information synthesis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Prohibited Uses</h2>
              <p className="text-gray-400 leading-relaxed mb-3">The following uses of our AI agents are strictly prohibited:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Generating misleading, deceptive, or fraudulent content</li>
                <li>Impersonating individuals without explicit consent</li>
                <li>Discrimination based on protected characteristics</li>
                <li>Surveillance or monitoring without proper authorization</li>
                <li>Circumventing security measures or gaining unauthorized access</li>
                <li>Creating content that is harmful, threatening, or illegal</li>
                <li>Autonomous decision-making on legally consequential matters without human oversight</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Human-in-the-Loop Controls</h2>
              <p className="text-gray-400 leading-relaxed">All our AI agents include human-in-the-loop mechanisms. High-impact actions require explicit human approval before execution. Users can configure approval thresholds, define escalation paths, and set boundaries for autonomous operation. These controls can be customized per agent and per task type.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Handling in AI Processing</h2>
              <p className="text-gray-400 leading-relaxed">Data processed by our AI agents is handled according to the following principles:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400 mt-3">
                <li>Data minimization: agents only access data necessary for the specific task</li>
                <li>No persistent memory of sensitive data unless explicitly configured</li>
                <li>Client data is never used to train models for other clients</li>
                <li>Agent interactions are logged for audit purposes with configurable retention</li>
                <li>Sensitive data detection and automatic redaction capabilities</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Model Training & Updates</h2>
              <p className="text-gray-400 leading-relaxed">When we fine-tune models for your agents, we use your data exclusively for your deployment. Models are retrained periodically to maintain accuracy and adapt to evolving needs. All model updates are tested before deployment and clients are notified of significant changes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Bias Monitoring & Mitigation</h2>
              <p className="text-gray-400 leading-relaxed">We conduct regular bias audits on all deployed agents. This includes analyzing agent outputs across demographic groups, monitoring for disparate impact, and implementing corrective measures when bias is detected. Clients receive quarterly bias assessment reports.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Incident Response</h2>
              <p className="text-gray-400 leading-relaxed">In the event of an AI-related incident (unexpected agent behavior, safety concern, or data breach), we follow a defined incident response protocol. This includes immediate agent suspension if necessary, root cause analysis, client notification within 24 hours, and implementation of corrective measures.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Continuous Improvement</h2>
              <p className="text-gray-400 leading-relaxed">We are committed to evolving our AI practices as the field advances. This policy is reviewed quarterly and updated to reflect new best practices, regulatory requirements, and industry standards. We actively participate in AI safety research and responsible AI communities.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
              <p className="text-gray-400 leading-relaxed">For questions about this AI Usage Policy or to report concerns about AI agent behavior, contact us at ai-ethics@hextantagency.com.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
