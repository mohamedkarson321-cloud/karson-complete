import type { Metadata } from "next";
import { Zap, Globe, Smartphone, Cloud, BarChart3, Settings, Shield, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Services — AI, Web, Mobile, Cloud & More",
  description: "KARSON offers end-to-end software services: AI solutions, web development, mobile apps, cloud architecture, data analytics, automation, cybersecurity, and consulting.",
  alternates: { canonical: "/services" },
};

const SERVICES_DETAIL = [
  {
    id: "ai",
    icon: Zap,
    color: "blue",
    title: "AI Solutions",
    tagline: "Intelligence that works in production",
    description: "We build AI systems that go beyond demos. From fine-tuned language models to computer vision pipelines to recommendation engines — we architect AI that delivers measurable ROI in production environments.",
    features: [
      "Custom LLM fine-tuning on your proprietary data",
      "Computer vision and image recognition systems",
      "Natural language processing and document intelligence",
      "Recommendation and personalization engines",
      "AI-powered search and retrieval systems",
      "Predictive analytics and anomaly detection",
      "MLOps infrastructure and model monitoring",
      "Conversational AI and chatbot development",
    ],
    deliverables: ["Production model serving infrastructure", "Model monitoring dashboard", "A/B testing framework", "Documentation & runbooks"],
    timeline: "6–16 weeks",
    startingAt: "$25,000",
  },
  {
    id: "web",
    icon: Globe,
    color: "violet",
    title: "Web Development",
    tagline: "Performant, accessible, production-ready",
    description: "We build full-stack web applications that combine beautiful design with engineering precision. Every app we ship scores 95+ on Lighthouse, is fully accessible, and is built to handle enterprise-scale traffic.",
    features: [
      "Next.js 15 with App Router and React Server Components",
      "TypeScript-first with strict mode enabled",
      "Design systems with Tailwind CSS and shadcn/ui",
      "PostgreSQL, Prisma ORM, and Redis caching",
      "Authentication with NextAuth and RBAC",
      "REST and GraphQL API design",
      "Real-time features with WebSockets",
      "Vercel/AWS deployment with CI/CD pipelines",
    ],
    deliverables: ["Full source code ownership", "Staging and production environments", "Performance audit report", "Admin dashboard"],
    timeline: "8–24 weeks",
    startingAt: "$15,000",
  },
  {
    id: "mobile",
    icon: Smartphone,
    color: "blue",
    title: "Mobile Apps",
    tagline: "Native performance, cross-platform reach",
    description: "We build iOS and Android apps that users love — with native performance, thoughtful UX, and offline-first architecture. Whether you need a standalone app or a companion to your web platform.",
    features: [
      "React Native and Expo for cross-platform",
      "Native Swift (iOS) and Kotlin (Android) when required",
      "Offline-first architecture with sync",
      "Push notifications and deep linking",
      "App Store and Play Store submission",
      "Biometric authentication integration",
      "Maps, payments, and media handling",
      "Analytics and crash reporting",
    ],
    deliverables: ["iOS and Android apps", "App Store submissions", "Backend API integration", "OTA update system"],
    timeline: "10–20 weeks",
    startingAt: "$20,000",
  },
  {
    id: "cloud",
    icon: Cloud,
    color: "violet",
    title: "Cloud Solutions",
    tagline: "Infrastructure that scales before you need it",
    description: "We design and implement cloud architectures on AWS, GCP, and Azure that are secure, cost-optimized, and ready to scale from Day 1 to IPO. Kubernetes, Terraform, CI/CD — all included.",
    features: [
      "Multi-cloud and hybrid cloud architecture",
      "Kubernetes cluster design and management",
      "Terraform infrastructure as code",
      "Cost optimization and FinOps",
      "Disaster recovery and business continuity",
      "CI/CD pipeline design and implementation",
      "Container security and image scanning",
      "Cloud cost visibility and alerts",
    ],
    deliverables: ["Infrastructure as code repository", "Architecture diagrams", "Runbooks and playbooks", "Cost optimization report"],
    timeline: "4–12 weeks",
    startingAt: "$18,000",
  },
  {
    id: "data",
    icon: BarChart3,
    color: "blue",
    title: "Data Analytics",
    tagline: "From raw data to competitive advantage",
    description: "We build modern data stacks that turn your scattered data into clear, actionable intelligence. Real-time dashboards, predictive models, and data warehouses that your entire team can use.",
    features: [
      "Modern data stack with Snowflake, dbt, Airflow",
      "Real-time streaming with Apache Kafka",
      "Business intelligence with Looker / Metabase",
      "Data quality monitoring and alerting",
      "Customer 360 and product analytics",
      "Predictive churn and revenue models",
      "A/B testing infrastructure",
      "GDPR-compliant data governance",
    ],
    deliverables: ["Data warehouse setup", "10+ production dashboards", "ML model deployment", "Data catalog documentation"],
    timeline: "6–14 weeks",
    startingAt: "$20,000",
  },
  {
    id: "automation",
    icon: Settings,
    color: "violet",
    title: "Automation Systems",
    tagline: "Eliminate repetitive work at scale",
    description: "We automate the workflows that eat your team's time — from document processing to multi-system data sync to intelligent task routing. Our automation systems save clients an average of 2,400 engineering hours per year.",
    features: [
      "Robotic Process Automation (RPA)",
      "Intelligent document processing with OCR + AI",
      "Multi-system API integration and orchestration",
      "Email and communication automation",
      "Invoice and financial document automation",
      "HR onboarding and offboarding workflows",
      "Custom webhook and event-driven systems",
      "Monitoring and exception handling",
    ],
    deliverables: ["Automation workflows", "Admin control panel", "ROI measurement dashboard", "Training documentation"],
    timeline: "4–10 weeks",
    startingAt: "$12,000",
  },
  {
    id: "security",
    icon: Shield,
    color: "blue",
    title: "Cybersecurity",
    tagline: "Security as a competitive advantage",
    description: "We embed security at every layer of your stack. From penetration testing and threat modeling to SOC 2 readiness and 24/7 monitoring — we protect the systems you depend on.",
    features: [
      "Penetration testing and vulnerability assessment",
      "SOC 2 Type I and Type II readiness",
      "GDPR, HIPAA, and PCI-DSS compliance",
      "Zero-trust network architecture",
      "SIEM implementation and management",
      "Security code review and audit",
      "Incident response planning",
      "Employee security awareness training",
    ],
    deliverables: ["Penetration test report", "Remediation roadmap", "Security policies", "Compliance documentation"],
    timeline: "4–8 weeks",
    startingAt: "$15,000",
  },
  {
    id: "consulting",
    icon: MessageSquare,
    color: "violet",
    title: "Tech Consulting",
    tagline: "Strategic clarity for technical decisions",
    description: "Sometimes you need an experienced CTO on your side without the full-time cost. We provide fractional CTO services, architecture reviews, technical due diligence for M&A, and technology strategy for boards.",
    features: [
      "Fractional CTO and technical advisory",
      "Architecture design reviews",
      "Technical due diligence for investors",
      "Technology roadmap development",
      "Engineering team assessment",
      "Build vs. buy analysis",
      "Vendor evaluation and selection",
      "Board-level technology presentations",
    ],
    deliverables: ["Architecture review document", "Technology roadmap", "Team assessment report", "Executive presentation"],
    timeline: "2–6 weeks",
    startingAt: "$8,000",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">Services</div>
          <h1 className="text-display-xl text-white mb-6">
            Every layer of your{" "}
            <span className="gradient-text">technology stack</span>
          </h1>
          <p className="text-body-xl text-white/55 mb-8">
            From AI models to cloud infrastructure. We cover everything,
            so you can focus on your product.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SERVICES_DETAIL.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="tag hover:text-white hover:border-white/20 transition-all"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services detail */}
      <div className="divide-y divide-white/5">
        {SERVICES_DETAIL.map((service, i) => {
          const Icon = service.icon;
          const isBlue = service.color === "blue";
          const isEven = i % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-20 md:py-28 ${isEven ? "bg-[#0A0A0A]" : "bg-[#070707]"}`}
              aria-label={`${service.title} service`}
            >
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Left */}
                  <div>
                    <div
                      className={`inline-flex p-3 rounded-2xl border mb-6 ${
                        isBlue
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          : "bg-violet-500/10 border-violet-500/20 text-violet-400"
                      }`}
                    >
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <p className={`text-sm font-medium mb-2 ${isBlue ? "text-blue-400" : "text-violet-400"}`}>
                      {service.tagline}
                    </p>
                    <h2 className="text-display-md text-white mb-4">{service.title}</h2>
                    <p className="text-body-lg text-white/55 mb-8 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/35 mb-1">Typical timeline</p>
                        <p className="font-semibold text-white">{service.timeline}</p>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-xs text-white/35 mb-1">Starting at</p>
                        <p className="font-semibold text-white">{service.startingAt}</p>
                      </div>
                    </div>

                    <Link
                      href={`/contact?service=${service.id}`}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                        isBlue
                          ? "bg-blue-500 hover:bg-blue-400 text-white"
                          : "bg-violet-500 hover:bg-violet-400 text-white"
                      }`}
                    >
                      Get a proposal
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="space-y-5">
                    {/* Features */}
                    <div className="card-dark rounded-2xl p-6">
                      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                        What&rsquo;s included
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                            <CheckCircle2
                              className={`w-4 h-4 mt-0.5 shrink-0 ${isBlue ? "text-blue-400" : "text-violet-400"}`}
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="card-dark rounded-2xl p-6">
                      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                        Deliverables
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((d) => (
                          <span key={d} className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium ${isBlue ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-violet-500/10 text-violet-300 border border-violet-500/20"}`}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
}
