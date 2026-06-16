import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Join the KARSON Team",
  description: "Build the future of AI-powered software at KARSON. Remote-first, elite engineering team, competitive compensation.",
  alternates: { canonical: "/careers" },
};

const BENEFITS = [
  { emoji: "💰", title: "Top-tier compensation", desc: "Competitive salary + equity. We pay at the 90th percentile for every role." },
  { emoji: "🌍", title: "Remote-first", desc: "Work from anywhere. Optional offices in SF, London, Singapore, and Dubai." },
  { emoji: "🧠", title: "20% learning time", desc: "One full day per week dedicated to learning, experiments, and open source." },
  { emoji: "🚀", title: "Ship real products", desc: "No JIRA ticket theater. Every engineer owns and ships production code." },
  { emoji: "🏥", title: "Premium healthcare", desc: "Full medical, dental, vision, mental health, and life insurance coverage." },
  { emoji: "🌴", title: "Unlimited PTO", desc: "Minimum 25 days encouraged. We actually mean it — tracked and enforced." },
];

const OPENINGS = [
  {
    id: "staff-ml-engineer",
    title: "Staff ML Engineer",
    department: "AI Research",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Staff",
    desc: "Design and deploy production ML systems serving millions of users. Own the full ML lifecycle from experiment to serving.",
    tags: ["PyTorch", "Python", "MLOps", "vLLM"],
  },
  {
    id: "senior-fullstack",
    title: "Senior Full-Stack Engineer",
    department: "Product Engineering",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Senior",
    desc: "Build high-performance web applications for our enterprise clients using Next.js 15, TypeScript, and Prisma.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
  },
  {
    id: "platform-engineer",
    title: "Staff Platform Engineer",
    department: "Cloud Infrastructure",
    location: "Remote (US/EU)",
    type: "Full-time",
    level: "Staff",
    desc: "Design Kubernetes clusters, multi-region infrastructure, and developer tooling used by 80+ engineers and 200+ clients.",
    tags: ["Kubernetes", "Terraform", "AWS", "Go"],
  },
  {
    id: "ai-product-manager",
    title: "Senior AI Product Manager",
    department: "Product",
    location: "San Francisco or Remote",
    type: "Full-time",
    level: "Senior",
    desc: "Define and ship AI-powered product features working alongside world-class ML and engineering teams.",
    tags: ["AI Products", "Strategy", "Data Analysis"],
  },
  {
    id: "security-engineer",
    title: "Senior Security Engineer",
    department: "Security",
    location: "Remote (US)",
    type: "Full-time",
    level: "Senior",
    desc: "Lead security engineering, penetration testing, SOC 2 compliance, and zero-trust architecture for KARSON and our clients.",
    tags: ["Pen Testing", "SOC 2", "AWS Security", "Zero Trust"],
  },
  {
    id: "data-engineer",
    title: "Senior Data Engineer",
    department: "Data",
    location: "Remote (Global)",
    type: "Full-time",
    level: "Senior",
    desc: "Build modern data stacks with Snowflake, dbt, and Airflow. Own data pipelines processing billions of events for enterprise clients.",
    tags: ["Snowflake", "dbt", "Airflow", "Kafka"],
  },
];

export default function CareersPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">We&rsquo;re hiring</div>
          <h1 className="text-display-xl text-white mb-5">
            Build the future of{" "}
            <span className="gradient-text">AI software</span>
          </h1>
          <p className="text-body-xl text-white/55 mb-8">
            Join 80+ world-class engineers, researchers, and operators working on
            some of the most technically demanding software problems in the world.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/35">
            <span>📍 Remote-first</span>
            <span>·</span>
            <span>🌎 40+ countries</span>
            <span>·</span>
            <span>⚡ {OPENINGS.length} open roles</span>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#070707]">
        <div className="container-wide">
          <h2 className="text-display-sm text-white text-center mb-12">Why engineers choose KARSON</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card-dark rounded-2xl p-7">
                <div className="text-3xl mb-4" aria-hidden="true">{b.emoji}</div>
                <h3 className="font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24">
        <div className="container-wide max-w-4xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-display-sm text-white">Open positions</h2>
            <span className="badge-blue">{OPENINGS.length} roles</span>
          </div>

          <div className="space-y-3">
            {OPENINGS.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                className="group block card-dark rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-blue">{job.department}</span>
                      <span className="text-xs text-white/30">{job.level}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-white/50 mb-3 max-w-xl">{job.desc}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-white/35">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                      {job.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 glass rounded-2xl p-8 text-center">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Don&rsquo;t see your role?</h3>
            <p className="text-white/50 mb-5 text-sm">
              We hire exceptional engineers and operators regardless of current openings.
              Send us your work and we&rsquo;ll reach out when the right role opens.
            </p>
            <a
              href="mailto:careers@karson.ai"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Send us your work → careers@karson.ai
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
