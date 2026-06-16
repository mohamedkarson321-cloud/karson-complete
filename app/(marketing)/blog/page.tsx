import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AI, Engineering & Technology Insights",
  description: "Deep dives into AI engineering, cloud architecture, software development best practices, and technology strategy from the KARSON team.",
  alternates: { canonical: "/blog" },
};

const POSTS = [
  {
    slug: "fine-tuning-llms-production",
    title: "Fine-Tuning LLMs for Production: A Complete Engineering Guide",
    excerpt: "Everything we've learned deploying 20+ fine-tuned language models in production. From dataset preparation to serving at scale with vLLM.",
    author: { name: "Sanya Patel", initials: "SP", title: "Head of AI Research" },
    category: "AI Engineering",
    tags: ["LLM", "Fine-tuning", "MLOps", "Python"],
    readingTime: 18,
    publishedAt: "Dec 12, 2024",
    featured: true,
    color: "blue",
  },
  {
    slug: "next-js-15-enterprise-patterns",
    title: "Next.js 15 App Router: Enterprise Architecture Patterns",
    excerpt: "How we structure large-scale Next.js applications with thousands of routes, complex auth, and multi-tenant data isolation.",
    author: { name: "David Okonkwo", initials: "DO", title: "VP of Engineering" },
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "React", "Architecture"],
    readingTime: 14,
    publishedAt: "Nov 28, 2024",
    featured: false,
    color: "violet",
  },
  {
    slug: "kubernetes-cost-optimization",
    title: "Kubernetes Cost Optimization: From $120K to $48K/Month",
    excerpt: "The exact playbook we used to reduce a client's Kubernetes costs by 60% without sacrificing performance or reliability.",
    author: { name: "Lucas Torres", initials: "LT", title: "Head of Cloud" },
    category: "Cloud",
    tags: ["Kubernetes", "AWS", "Cost Optimization", "DevOps"],
    readingTime: 11,
    publishedAt: "Nov 14, 2024",
    featured: false,
    color: "blue",
  },
  {
    slug: "rag-systems-production",
    title: "Building RAG Systems That Actually Work in Production",
    excerpt: "Moving beyond toy RAG demos to systems that handle real enterprise knowledge bases with accuracy, speed, and auditability.",
    author: { name: "Sanya Patel", initials: "SP", title: "Head of AI Research" },
    category: "AI Engineering",
    tags: ["RAG", "LangChain", "Vector DB", "LLM"],
    readingTime: 16,
    publishedAt: "Oct 30, 2024",
    featured: false,
    color: "violet",
  },
  {
    slug: "data-engineering-modern-stack",
    title: "The Modern Data Stack in 2025: What We Actually Use",
    excerpt: "An honest breakdown of the data tools we use across 40+ client projects. What works, what doesn't, and what's overhyped.",
    author: { name: "Mia Zhang", initials: "MZ", title: "CTO" },
    category: "Data Engineering",
    tags: ["dbt", "Snowflake", "Airflow", "Data Stack"],
    readingTime: 12,
    publishedAt: "Oct 15, 2024",
    featured: false,
    color: "blue",
  },
  {
    slug: "soc2-startup-guide",
    title: "SOC 2 Type II for Startups: The No-BS Engineering Guide",
    excerpt: "We've helped 15 companies achieve SOC 2 Type II. Here's exactly what to build, what to skip, and how to do it in 3 months.",
    author: { name: "David Okonkwo", initials: "DO", title: "VP of Engineering" },
    category: "Security",
    tags: ["SOC 2", "Security", "Compliance", "DevSecOps"],
    readingTime: 20,
    publishedAt: "Sep 28, 2024",
    featured: false,
    color: "violet",
  },
];

const CATEGORIES = ["All", "AI Engineering", "Web Development", "Cloud", "Data Engineering", "Security", "Product"];

export default function BlogPage() {
  const featuredPost = POSTS.find((p) => p.featured)!;
  const regularPosts = POSTS.filter((p) => !p.featured);

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">The KARSON Blog</div>
          <h1 className="text-display-xl text-white mb-5">
            Engineering insights from{" "}
            <span className="gradient-text">the frontlines</span>
          </h1>
          <p className="text-body-xl text-white/55 mb-8">
            Deep technical guides, architecture teardowns, and AI engineering
            lessons from 180+ production deployments.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles…"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/40 transition-colors"
              aria-label="Search blog articles"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat === "All" ? "bg-blue-500/10 text-blue-400 border border-blue-500/25" : "bg-white/3 text-white/50 border border-white/8 hover:text-white hover:border-white/15"}`}
                aria-pressed={cat === "All"}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-8">
        <div className="container-wide">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <article className="card-dark rounded-3xl overflow-hidden hover:border-blue-500/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500/12 to-violet-500/10 h-56 relative">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-6 left-6">
                  <span className="badge-blue">Featured</span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-blue">{featuredPost.category}</span>
                  <div className="flex items-center gap-1 text-xs text-white/35">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {featuredPost.readingTime} min read
                  </div>
                  <span className="text-xs text-white/25">{featuredPost.publishedAt}</span>
                </div>
                <h2 className="text-display-xs text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-body-lg text-white/55 mb-6 max-w-2xl">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                      {featuredPost.author.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{featuredPost.author.name}</p>
                      <p className="text-xs text-white/35">{featuredPost.author.title}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-blue-400 group-hover:gap-2 transition-all">
                    Read article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map((post) => {
              const isBlue = post.color === "blue";
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="card-dark rounded-2xl overflow-hidden h-full hover:border-white/10 transition-all duration-300 flex flex-col">
                    <div className={`h-36 relative ${isBlue ? "bg-gradient-to-br from-blue-500/10 to-blue-900/20" : "bg-gradient-to-br from-violet-500/10 to-violet-900/20"}`}>
                      <div className="absolute inset-0 dot-pattern opacity-30" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${isBlue ? "bg-blue-500/10 text-blue-400" : "bg-violet-500/10 text-violet-400"}`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-white/30">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}m
                        </div>
                      </div>
                      <h2 className="font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug flex-1">
                        {post.title}
                      </h2>
                      <p className="text-sm text-white/45 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                            {post.author.initials}
                          </div>
                          <span className="text-xs text-white/40">{post.author.name}</span>
                        </div>
                        <span className="text-xs text-white/25">{post.publishedAt}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
