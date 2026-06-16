import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — KARSON",
  description: "KARSON Terms of Service governing the use of our platform and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <section className="pt-36 pb-16">
        <div className="container-narrow">
          <div className="badge-blue mb-6">Legal</div>
          <h1 className="text-display-lg text-white mb-4">Terms of Service</h1>
          <p className="text-white/40 text-sm">Last updated: December 1, 2024</p>
        </div>
      </section>
      <section className="pb-28">
        <div className="container-narrow">
          <div className="prose-dark">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using KARSON&rsquo;s website, platform, or services, you agree
              to be bound by these Terms of Service. If you do not agree, do not
              use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              KARSON provides software development, AI solutions, cloud consulting,
              and related technology services under separate Statement of Work (SOW)
              agreements. The platform provides project management, communication,
              and billing tools for active clients.
            </p>

            <h2>3. Account Responsibilities</h2>
            <ul>
              <li>You must be 18 years or older to use our services</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate and complete registration information</li>
              <li>You may not share your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Upon full payment, KARSON assigns all intellectual property rights in
              custom-developed software to the client, as specified in the applicable
              SOW. KARSON retains ownership of its pre-existing tools, frameworks,
              and methodologies used in delivery.
            </p>

            <h2>5. Payment Terms</h2>
            <ul>
              <li>Retainer fees are due in advance for the applicable period</li>
              <li>Project milestones are invoiced as specified in the SOW</li>
              <li>Late payments accrue interest at 1.5% per month</li>
              <li>KARSON may suspend services for accounts 30+ days overdue</li>
            </ul>

            <h2>6. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of the other
              party&rsquo;s proprietary information. KARSON will not disclose client
              project details without written consent. NDAs are available upon request.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              KARSON&rsquo;s total liability for any claim shall not exceed the fees paid
              in the 3 months preceding the claim. KARSON is not liable for indirect,
              incidental, or consequential damages. Some jurisdictions do not allow
              these limitations, so they may not apply to you.
            </p>

            <h2>8. Warranties</h2>
            <p>
              KARSON warrants that services will be performed in a professional manner
              consistent with industry standards. Software is warranted against material
              defects for 90 days post-delivery. THE PLATFORM IS PROVIDED &quot;AS IS&quot;
              WITHOUT WARRANTIES BEYOND THOSE STATED HEREIN.
            </p>

            <h2>9. Termination</h2>
            <p>
              Either party may terminate with 30 days written notice. KARSON may
              terminate immediately for material breach, non-payment, or unlawful use.
              Upon termination, client data is available for export for 30 days.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California, USA.
              Disputes shall be resolved by binding arbitration in San Francisco, CA,
              under AAA Commercial Arbitration Rules.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We may update these Terms at any time. Material changes will be
              communicated via email 30 days in advance. Continued use after
              the effective date constitutes acceptance.
            </p>

            <h2>12. Contact</h2>
            <p>Questions about these Terms: <a href="mailto:legal@karson.ai">legal@karson.ai</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
