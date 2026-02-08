import { PageHero } from '../components/UI'

export default function Terms() {
  return (
    <>
      <PageHero
        tag="Legal"
        title="Terms of Service"
        description="Last updated: February 1, 2026"
      />
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">By accessing or using the services provided by HextantAgency ("Company", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who wish to access or use our platform and AI agent solutions.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
              <p className="text-gray-400 leading-relaxed">HextantAgency provides agentic AI solutions including but not limited to: AI agent development, deployment, monitoring, custom integrations, and ongoing optimization services. Our agents operate autonomously within defined parameters and include human-in-the-loop controls as described in your service agreement.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts & Responsibilities</h2>
              <p className="text-gray-400 leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use. You must provide accurate, current, and complete information during registration and keep your account information up-to-date.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
              <p className="text-gray-400 leading-relaxed mb-3">You agree not to use our services to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful, offensive, or illegal content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use AI agents for deceptive, fraudulent, or malicious purposes</li>
                <li>Reverse engineer, decompile, or disassemble our technology</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">All intellectual property rights in our platform, technology, and AI agents remain the property of HextantAgency. You retain ownership of your data and any custom configurations specific to your deployment. Agent outputs generated for you belong to you, subject to the underlying technology remaining our property.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Payment Terms</h2>
              <p className="text-gray-400 leading-relaxed">Subscription fees are billed in advance on a monthly or annual basis. Usage-based charges are billed in arrears. All payments are non-refundable except as expressly stated in your service agreement. We reserve the right to modify pricing with 30 days' notice.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">To the maximum extent permitted by law, HextantAgency shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of our services. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
              <p className="text-gray-400 leading-relaxed">Either party may terminate the service agreement with 30 days' written notice. We may suspend or terminate your access immediately for violation of these terms. Upon termination, your data will be retained for 30 days to allow export, after which it will be securely deleted.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration in San Francisco, CA.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact</h2>
              <p className="text-gray-400 leading-relaxed">For questions about these Terms of Service, please contact us at legal@hextantagency.com.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
