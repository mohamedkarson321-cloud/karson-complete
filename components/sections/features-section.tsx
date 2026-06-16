"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Zap, Shield, Globe, BarChart3, Code2, Layers,
  Cpu, Lock, Rocket, GitBranch, Database, CloudLightning,
} from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "AI-Native Architecture",
    description:
      "Every system we build is designed with AI at its core — not bolted on. From inference pipelines to model serving, we architect for intelligence.",
    color: "blue",
    size: "large",
  },
  {
    icon: Zap,
    title: "Sub-50ms Performance",
    description:
      "Speed is a feature. Our cloud-native infrastructure delivers enterprise-scale performance with p99 latency under 50ms.",
    color: "violet",
    size: "small",
  },
  {
    icon: Shield,
    title: "Security by Default",
    description:
      "Zero-trust architecture, end-to-end encryption, and SOC 2 compliance built into every project from day one.",
    color: "blue",
    size: "small",
  },
  {
    icon: CloudLightning,
    title: "Infinite Scale",
    description:
      "From 1 user to 100 million. Our auto-scaling infrastructure grows with you — no re-architecting required.",
    color: "violet",
    size: "large",
  },
  {
    icon: GitBranch,
    title: "CI/CD Automation",
    description:
      "Automated testing, staging, and production deployments. Ship faster with confidence using our battle-tested DevOps pipelines.",
    color: "blue",
    size: "small",
  },
  {
    icon: Database,
    title: "Data Intelligence",
    description:
      "Real-time data pipelines, vector databases, and ML-powered analytics that turn raw data into competitive advantage.",
    color: "violet",
    size: "small",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "CDN-first delivery across 300+ PoPs worldwide. Your users get fast, reliable performance regardless of location.",
    color: "blue",
    size: "small",
  },
  {
    icon: Layers,
    title: "Modular Integration",
    description:
      "Pre-built connectors for 200+ enterprise tools. Salesforce, SAP, Workday, and custom APIs — we integrate seamlessly.",
    color: "violet",
    size: "small",
  },
];

const colorMap = {
  blue: {
    icon: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    accent: "from-blue-500/8 to-transparent",
    hover: "hover:border-blue-500/25",
    glow: "group-hover:shadow-glow-sm",
  },
  violet: {
    icon: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    accent: "from-violet-500/8 to-transparent",
    hover: "hover:border-violet-500/25",
    glow: "group-hover:shadow-glow-violet",
  },
};

export function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="features"
      ref={ref}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
      aria-label="Platform features"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-40" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] bg-blue-500/5 rounded-full" aria-hidden="true" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge-blue mx-auto mb-4"
          >
            <Code2 className="w-3 h-3" aria-hidden="true" />
            Platform Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md text-white mb-4"
          >
            Built for what&rsquo;s{" "}
            <span className="gradient-text">next</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-body-lg text-pretty"
          >
            We combine deep engineering expertise with cutting-edge AI to deliver
            platforms that are fast, secure, and built to last.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
          {FEATURES.map((feature, i) => {
            const colors = colorMap[feature.color as keyof typeof colorMap]!;
            const Icon = feature.icon;
            const isLarge = feature.size === "large";

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative card-dark rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300 ${colors.hover} ${isLarge ? "lg:col-span-2" : ""}`}
              >
                {/* Card background accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-radial ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${colors.icon} ${colors.glow} transition-all duration-300`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>

                {isLarge && (
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <Rocket className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      <span className="text-xs text-white/40">
                        Deployed across 40+ enterprise clients
                      </span>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { value: "99.99%", label: "Uptime SLA", icon: Shield },
            { value: "<50ms", label: "p99 Latency", icon: Zap },
            { value: "SOC 2", label: "Type II Certified", icon: Lock },
            { value: "300+", label: "Edge Locations", icon: Globe },
          ].map(({ value, label, icon: Icon }, i) => (
            <div
              key={label}
              className="glass rounded-xl p-5 flex items-center gap-4"
            >
              <Icon className="w-8 h-8 text-blue-400/60 shrink-0" aria-hidden="true" />
              <div>
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
