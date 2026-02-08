import { PageHero } from '../components/UI'

export default function Privacy() {
  return (
    <>
      <PageHero
        tag="Legal"
        title="Privacy Policy"
        description="Last updated: February 1, 2026"
      />
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-3">We collect information that you provide directly and information collected automatically:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Account Information:</strong> Name, email address, company name, and payment details when you create an account or purchase services.</li>
                <li><strong className="text-gray-300">Agent Data:</strong> Data you provide to configure and train your AI agents, including business rules, documents, and workflow configurations.</li>
                <li><strong className="text-gray-300">Usage Data:</strong> Log data, agent interaction metrics, feature usage, and performance analytics.</li>
                <li><strong className="text-gray-300">Device Information:</strong> Browser type, operating system, IP address, and device identifiers collected automatically.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Provide, maintain, and improve our AI agent services</li>
                <li>Train and optimize your custom AI agents</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, investigate, and prevent security incidents</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing & Disclosure</h2>
              <p className="text-gray-400 leading-relaxed mb-3">We do not sell your personal information. We may share information with:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong className="text-gray-300">Service Providers:</strong> Third-party vendors who assist in providing our services (cloud hosting, payment processing, analytics).</li>
                <li><strong className="text-gray-300">AI Model Providers:</strong> We may transmit data to AI model providers to process agent requests. All such transmissions are encrypted and governed by data processing agreements.</li>
                <li><strong className="text-gray-300">Legal Requirements:</strong> When required by law, legal process, or to protect our rights and safety.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
              <p className="text-gray-400 leading-relaxed">We retain your data for as long as your account is active or as needed to provide services. Agent interaction data is retained for 90 days by default for optimization purposes. You can request earlier deletion at any time. Upon account termination, all data is deleted within 30 days.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-gray-400 leading-relaxed">We implement industry-standard security measures including AES-256 encryption at rest and TLS 1.3 in transit, role-based access control, regular security audits, and SOC 2 Type II compliance. Despite our efforts, no method of electronic storage is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-3">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability — receive your data in a structured format</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. International Transfers</h2>
              <p className="text-gray-400 leading-relaxed">Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) and adequacy decisions where applicable.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies & Tracking</h2>
              <p className="text-gray-400 leading-relaxed">We use essential cookies for site functionality and optional analytics cookies to improve our services. You can manage cookie preferences through your browser settings. We do not use tracking cookies for advertising purposes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="text-gray-400 leading-relaxed">Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
              <p className="text-gray-400 leading-relaxed">For privacy-related inquiries, contact our Data Protection Officer at privacy@hextantagency.com.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
