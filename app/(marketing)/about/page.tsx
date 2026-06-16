import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "About KARSON — Our Story, Mission & Team",
  description:
    "Learn about KARSON's mission to make AI-powered software the standard for every business. Meet the team behind our engineering excellence.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  { year: "2018", title: "Founded", desc: "KARSON was founded by a team of ex-Google and ex-Amazon engineers with a singular mission: make AI-first software the default." },
  { year: "2019", title: "First Enterprise Client", desc: "Delivered our first AI-powered platform for a Fortune 500 financial institution, processing 500M transactions/month." },
  { year: "2020", title: "Series A — $12M", desc: "Raised $12M to expand our AI research team and cloud infrastructure capabilities. Grew to 40 engineers." },
  { year: "2021", title: "100 Clients", desc: "Reached 100 active enterprise clients across North America, Europe, and Asia Pacific." },
  { year: "2022", title: "KARSON AI Engine", desc: "Launched our proprietary AI Engine — a modular ML platform powering 40+ production AI systems globally." },
  { year: "2023", title: "Series B — $48M", desc: "Raised $48M to accelerate global expansion and develop next-gen AI automation capabilities." },
  { year: "2024", title: "200+ Clients Globally", desc: "Surpassed 200 active clients and 180 delivered projects. Expanded to London, Singapore, and Dubai." },
  { year: "2025", title: "The Future", desc: "Building KARSON Platform v3 — the first self-healing, AI-governed cloud infrastructure for enterprise." },
];

const VALUES = [
  {
    title: "Engineering First",
    description:
      "We are engineers before we are a business. Every decision — from architecture to hiring to pricing — is made with engineering quality as the primary lens.",
    icon: "⚙️",
  },
  {
    title: "Radical Transparency",
    description:
      "No hidden costs, no smoke and mirrors. We tell clients the truth about timelines, risks, and trade-offs — even when it's uncomfortable.",
    icon: "🔎",
  },
  {
    title: "Ownership Mentality",
    description:
      "We treat every client's product like it's ours. We lose sleep over your uptime, your performance, your user experience.",
    icon: "🎯",
  },
  {
    title: "Permanent Learning",
    description:
      "The AI landscape changes every week. Our engineers dedicate 20% of their time to learning, experimenting, and pushing the state of the art.",
    icon: "🧠",
  },
];

const TEAM = [
  { name: "Alex Karson", title: "CEO & Co-Founder", bio: "Ex-Google Brain. Led ML infrastructure for Google Search. Stanford CS PhD.", initials: "AK" },
  { name: "Mia Zhang", title: "CTO & Co-Founder", bio: "Ex-Amazon AWS. Architect of services serving 1B+ requests/day. MIT graduate.", initials: "MZ" },
  { name: "David Okonkwo", title: "VP of Engineering", bio: "Ex-Stripe. Built Stripe's fraud detection ML pipeline. 15 years distributed systems.", initials: "DO" },
  { name: "Sanya Patel", title: "Head of AI Research", bio: "Ex-DeepMind. Published 20+ papers on LLMs and computer vision. Oxford PhD.", initials: "SP" },
  { name: "Lucas Torres", title: "Head of Cloud", bio: "Ex-Netflix. Designed Netflix's multi-region DR architecture. AWS Distinguished Architect.", initials: "LT" },
  { name: "Emma Kristiansen", title: "Head of Design", bio: "Ex-Apple. Led design for Apple Intelligence features. 12 years product design.", initials: "EK" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="absolute inset-0 hero-lines opacity-50" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <div className="badge-blue mx-auto mb-6">Our Story</div>
          <h1 className="text-display-xl text-white mb-6">
            We exist to make{" "}
            <span className="gradient-text">AI-first software</span>
            <br />
            the global standard
          </h1>
          <p className="text-body-xl text-white/55 max-w-2xl mx-auto">
            Founded by engineers from Google, Amazon, DeepMind, and Stripe —
            KARSON exists to close the gap between what AI can do and what
            businesses actually deploy.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#070707]">
        <div className="container-wide grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Mission",
              title: "Make intelligence the default",
              body: "Every software system in the world should be intelligent. Not AI-adjacent, not AI-assisted — AI-native from day one. KARSON exists to make that a reality for every company, at every scale.",
              color: "blue",
            },
            {
              label: "Vision",
              title: "A world where software thinks",
              body: "We envision a world where software doesn't just execute instructions — it understands context, anticipates needs, and improves autonomously. We're building the infrastructure for that future today.",
              color: "violet",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`glass rounded-3xl p-10 border ${
                item.color === "blue" ? "border-blue-500/15" : "border-violet-500/15"
              }`}
            >
              <div
                className={`badge-${item.color === "blue" ? "blue" : "violet"} mb-5 w-fit`}
              >
                {item.label}
              </div>
              <h2 className="text-display-sm text-white mb-4">{item.title}</h2>
              <p className="text-white/55 leading-relaxed text-body-lg">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-sm bg-[#0A0A0A]">
        <div className="container-wide">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="badge-violet mx-auto mb-4">What we believe</div>
            <h2 className="text-display-md text-white mb-4">Our values</h2>
            <p className="text-white/50">
              Not aspirational taglines — actual principles that govern how we make decisions every day.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card-dark rounded-2xl p-7">
                <div className="text-3xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[#070707]">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-14">
            <div className="badge-blue mx-auto mb-4">Since 2018</div>
            <h2 className="text-display-md text-white mb-4">Our journey</h2>
            <p className="text-white/50">Seven years of shipping, growing, and raising the bar.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/8 -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="hidden md:flex flex-1 items-center justify-end">
                    {i % 2 === 0 && (
                      <div className="card-dark rounded-xl p-5 max-w-xs">
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-white/50">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative flex items-start md:items-center">
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 border-4 border-[#070707] z-10">
                      <span className="sr-only">{item.year}</span>
                    </div>
                    <div className="ml-14 md:ml-0 md:hidden card-dark rounded-xl p-5">
                      <span className="text-xs font-bold text-blue-400">{item.year}</span>
                      <h3 className="font-semibold text-white mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-1 items-center">
                    {i % 2 === 1 && (
                      <div className="card-dark rounded-xl p-5 max-w-xs">
                        <span className="text-xs font-bold text-blue-400">{item.year}</span>
                        <h3 className="font-semibold text-white mt-1 mb-1">{item.title}</h3>
                        <p className="text-sm text-white/50">{item.desc}</p>
                      </div>
                    )}
                    {i % 2 === 0 && (
                      <span className="text-2xl font-bold text-white/20">{item.year}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#0A0A0A]">
        <div className="container-wide">
          <div className="text-center mb-14">
            <div className="badge-violet mx-auto mb-4">The people</div>
            <h2 className="text-display-md text-white mb-4">Leadership team</h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Engineers, researchers, and operators from the world's best technology companies.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="group card-dark rounded-2xl p-6 flex items-start gap-4 hover:border-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-blue-400 mb-2">{member.title}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-10 text-white/30 text-sm">
            And 80+ world-class engineers, designers, and operators.{" "}
            <a href="/careers" className="text-blue-400 hover:text-blue-300 transition-colors">
              Join us →
            </a>
          </p>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
