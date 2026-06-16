import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Portfolio — Case Studies & Projects",
  description: "Explore KARSON's portfolio of AI, web, mobile, and cloud projects. Real case studies with measurable outcomes.",
  alternates: { canonical: "/portfolio" },
};

const CATEGORIES = ["All", "AI Solutions", "Web Development", "Mobile Apps", "Cloud", "Data Analytics"];

const PROJECTS = [
  {
    slug: "financecore-fraud-detection",
    title: "AI Fraud Detection Engine",
    client: "FinanceCore Global",
    category: "AI Solutions",
    description: "Rebuilt fraud detection system using transformer-based ML, reducing false positives by 40% and increasing detection accuracy from 67% to 94%.",
    tags: ["PyTorch", "FastAPI", "PostgreSQL", "Kafka"],
    metrics: [{ label: "Detection accuracy", value: "94%" }, { label: "False positives", value: "−40%" }],
    color: "blue",
    year: "2024",
  },
  {
    slug: "healthsync-diagnostic-ai",
    title: "Clinical AI Diagnostic Assistant",
    client: "HealthSync AI",
    category: "AI Solutions",
    description: "HIPAA-compliant AI diagnostic assistant serving 50,000 patient queries/month with natural language understanding and clinical decision support.",
    tags: ["LLM Fine-tuning", "HIPAA", "Next.js", "Python"],
    metrics: [{ label: "Monthly users", value: "50K" }, { label: "Query accuracy", value: "91%" }],
    color: "violet",
    year: "2024",
  },
  {
    slug: "nexatech-data-platform",
    title: "Real-time Data Intelligence Platform",
    client: "NexaTech Ventures",
    category: "Data Analytics",
    description: "End-to-end data platform processing 10M events/day. Snowflake warehouse, dbt transformations, and Looker dashboards for 200+ internal users.",
    tags: ["Snowflake", "dbt", "Kafka", "Looker"],
    metrics: [{ label: "Events/day", value: "10M" }, { label: "Dashboard users", value: "200+" }],
    color: "blue",
    year: "2023",
  },
  {
    slug: "logiflow-ecommerce-platform",
    title: "AI-Powered E-commerce Platform",
    client: "LogiFlow Systems",
    category: "Web Development",
    description: "Full-stack e-commerce platform with AI recommendations, dynamic pricing engine, and real-time inventory. 340% sales increase in Q1 post-launch.",
    tags: ["Next.js", "Prisma", "Redis", "Stripe"],
    metrics: [{ label: "Sales increase", value: "+340%" }, { label: "Lighthouse score", value: "97" }],
    color: "violet",
    year: "2023",
  },
  {
    slug: "nordic-content-engine",
    title: "Content Recommendation Engine",
    client: "Nordic Media Group",
    category: "AI Solutions",
    description: "ML-powered content recommendation system serving 5M users. 2.3x watch time increase and retention improved from 28% to 61% M/M.",
    tags: ["Collaborative Filtering", "PyTorch", "Redis", "GraphQL"],
    metrics: [{ label: "Watch time", value: "×2.3" }, { label: "M/M retention", value: "61%" }],
    color: "blue",
    year: "2023",
  },
  {
    slug: "enterprise-cloud-migration",
    title: "Multi-cloud Migration & Modernization",
    client: "Fortune 500 Retailer",
    category: "Cloud",
    description: "Led migration of 200+ microservices from on-premise to AWS/GCP. Zero downtime. 60% infrastructure cost reduction with Kubernetes and Terraform.",
    tags: ["AWS", "GCP", "Kubernetes", "Terraform"],
    metrics: [{ label: "Cost reduction", value: "−60%" }, { label: "Uptime during migration", value: "100%" }],
    color: "violet",
    year: "2024",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">Portfolio</div>
          <h1 className="text-display-xl text-white mb-5">
            Work that speaks{" "}
            <span className="gradient-text">louder than claims</span>
          </h1>
          <p className="text-body-xl text-white/55">
            Real projects. Real clients. Real results. Every case study includes
            actual metrics and honest assessments.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-6">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  cat === "All"
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                    : "bg-white/3 text-white/50 border border-white/8 hover:text-white hover:border-white/15"
                }`}
                aria-pressed={cat === "All"}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="pb-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project) => {
              const isBlue = project.color === "blue";
              return (
                <article
                  key={project.slug}
                  className="group card-dark rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className={`h-48 relative overflow-hidden ${isBlue ? "bg-gradient-to-br from-blue-500/15 to-blue-900/30" : "bg-gradient-to-br from-violet-500/15 to-violet-900/30"}`}>
                    <div className="absolute inset-0 grid-pattern opacity-40" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isBlue ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-violet-500/20 text-violet-300 border border-violet-500/30"}`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-white/30">{project.year}</div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs text-white/35 mb-2">{project.client}</p>
                    <h2 className="font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {project.metrics.map((m) => (
                        <div key={m.label} className={`rounded-lg px-3 py-2 ${isBlue ? "bg-blue-500/8" : "bg-violet-500/8"}`}>
                          <p className={`text-lg font-bold ${isBlue ? "text-blue-400" : "text-violet-400"}`}>{m.value}</p>
                          <p className="text-xs text-white/35">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio/${project.slug}`}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${isBlue ? "text-blue-400/60 hover:text-blue-400" : "text-violet-400/60 hover:text-violet-400"}`}
                    >
                      Read case study
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
