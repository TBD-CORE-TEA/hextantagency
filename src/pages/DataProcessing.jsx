import { PageHero } from '../components/UI'

export default function DataProcessing() {
  return (
    <>
      <PageHero
        tag="Legal"
        title="Data Processing Agreement"
        description="Last updated: February 1, 2026"
      />
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <div className="p-6 rounded-xl bg-surface border border-white/5 mb-8">
              <p className="text-gray-400 leading-relaxed">
                This Data Processing Agreement ("DPA") forms part of the service agreement between HextantAgency ("Processor") and the client ("Controller") and governs the processing of personal data by our AI agents and systems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">"Personal Data"</strong> means any information relating to an identified or identifiable natural person processed through our AI agent services.</li>
                <li><strong className="text-gray-300">"Processing"</strong> means any operation performed on Personal Data, including collection, storage, use, and deletion by AI agents.</li>
                <li><strong className="text-gray-300">"Sub-processor"</strong> means any third party engaged by HextantAgency to process Personal Data, including AI model providers and cloud infrastructure providers.</li>
                <li><strong className="text-gray-300">"Agent Processing"</strong> means the automated processing of data by AI agents in the course of performing their designated tasks.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Scope & Purpose of Processing</h2>
              <p className="text-gray-400 leading-relaxed">The Processor shall process Personal Data solely for the purpose of providing AI agent services as described in the service agreement. This includes agent training, real-time agent operation, analytics and reporting, and system optimization. Processing shall not exceed the scope necessary for these purposes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Obligations of the Processor</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Process Personal Data only on documented instructions from the Controller</li>
                <li>Ensure that persons authorized to process data are bound by confidentiality obligations</li>
                <li>Implement appropriate technical and organizational security measures</li>
                <li>Assist the Controller in fulfilling data subject rights requests</li>
                <li>Delete or return all Personal Data upon termination of the agreement</li>
                <li>Make available all information necessary to demonstrate compliance</li>
                <li>Implement data minimization practices in all agent operations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Security Measures</h2>
              <p className="text-gray-400 leading-relaxed mb-3">HextantAgency implements the following security measures:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS 1.3 encryption for data in transit</li>
                <li>Role-based access control (RBAC)</li>
                <li>Multi-factor authentication for all staff access</li>
                <li>Regular penetration testing and vulnerability assessments</li>
                <li>SOC 2 Type II certified infrastructure</li>
                <li>Agent-level access controls and data sandboxing</li>
                <li>Automated threat detection and incident response</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Sub-processors</h2>
              <p className="text-gray-400 leading-relaxed">The Controller authorizes the use of sub-processors listed in our Sub-processor Registry. We will notify the Controller of any intended changes to sub-processors at least 30 days in advance. The Controller may object to new sub-processors, and we will work to find an acceptable solution.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. International Transfers</h2>
              <p className="text-gray-400 leading-relaxed">Where Personal Data is transferred outside the European Economic Area, we ensure adequate protection through Standard Contractual Clauses (SCCs), EU-US Data Privacy Framework certification, or other approved transfer mechanisms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Breach Notification</h2>
              <p className="text-gray-400 leading-relaxed">In the event of a Personal Data breach, we will notify the Controller without undue delay and no later than 48 hours after becoming aware. The notification will include the nature of the breach, categories and approximate number of records affected, likely consequences, and measures taken or proposed to address the breach.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Audits</h2>
              <p className="text-gray-400 leading-relaxed">The Controller may conduct audits to verify compliance with this DPA. Audits shall be conducted with reasonable notice and during business hours. We will provide all necessary cooperation and access to relevant documentation.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact</h2>
              <p className="text-gray-400 leading-relaxed">For questions about this DPA, contact our Data Protection Officer at dpo@hextantagency.com.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
