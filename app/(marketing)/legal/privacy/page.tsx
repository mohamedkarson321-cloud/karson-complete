import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — KARSON",
  description: "How KARSON collects, uses, and protects your personal information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "December 1, 2024";

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <section className="pt-36 pb-16">
        <div className="container-narrow">
          <div className="badge-blue mb-6">Legal</div>
          <h1 className="text-display-lg text-white mb-4">Privacy Policy</h1>
          <p className="text-white/40 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-narrow">
          <div className="prose-dark">
            <h2>1. Introduction</h2>
            <p>
              KARSON, Inc. (&quot;KARSON,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              website (karson.ai), platform, and services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <p>We collect information you directly provide:</p>
            <ul>
              <li><strong>Account data:</strong> name, email address, password, company</li>
              <li><strong>Contact data:</strong> messages, project briefs, contact form submissions</li>
              <li><strong>Payment data:</strong> billing address (payment card data processed by Stripe)</li>
              <li><strong>Communications:</strong> emails, support tickets, survey responses</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage data:</strong> pages visited, features used, click patterns</li>
              <li><strong>Technical data:</strong> IP address, browser type, device type, OS</li>
              <li><strong>Cookies:</strong> session tokens, preference cookies (see Section 6)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide, operate, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative communications (account, security, updates)</li>
              <li>Respond to comments and questions</li>
              <li>Analyze usage patterns to improve platform performance</li>
              <li>Detect, investigate, and prevent fraudulent or illegal activity</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul>
              <li><strong>Service providers:</strong> Vercel (hosting), Stripe (payments), Resend (email), Datadog (monitoring)</li>
              <li><strong>Legal requirements:</strong> when required by law or court order</li>
              <li><strong>Business transfers:</strong> in connection with a merger or acquisition (with notice)</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to provide our services
              and comply with legal obligations. Account data is retained for the
              lifetime of the account plus 90 days after deletion. Contact form data
              is retained for 3 years.
            </p>

            <h2>6. Cookies</h2>
            <p>We use the following cookie categories:</p>
            <ul>
              <li><strong>Essential:</strong> Required for authentication and security. Cannot be disabled.</li>
              <li><strong>Analytics:</strong> Vercel Analytics and Speed Insights (privacy-first, no personal data).</li>
              <li><strong>Preferences:</strong> Theme and language settings.</li>
            </ul>

            <h2>7. Your Rights (GDPR & CCPA)</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p>To exercise these rights, email: <a href="mailto:privacy@karson.ai">privacy@karson.ai</a></p>

            <h2>8. Data Security</h2>
            <p>
              We implement industry-standard security measures including AES-256
              encryption at rest, TLS 1.3 in transit, SOC 2 Type II compliant
              infrastructure, and regular penetration testing.
            </p>

            <h2>9. International Transfers</h2>
            <p>
              KARSON operates globally. Data may be transferred to and processed in
              countries outside your own. We use Standard Contractual Clauses for
              EU data transfers and comply with the EU-US Data Privacy Framework.
            </p>

            <h2>10. Children&rsquo;s Privacy</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly
              collect personal data from children.
            </p>

            <h2>11. Contact Us</h2>
            <p>For privacy questions or requests:</p>
            <ul>
              <li>Email: <a href="mailto:privacy@karson.ai">privacy@karson.ai</a></li>
              <li>Post: KARSON, Inc., 100 Innovation Drive, San Francisco, CA 94105</li>
              <li>EU Representative: KARSON EU Ltd., 30 Churchill Place, London E14 5EU</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
