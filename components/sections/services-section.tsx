"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Zap, Globe, Smartphone, Cloud, BarChart3,
  Settings, Shield, MessageSquare, ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    title: "AI Solutions",
    slug: "ai",
    description:
      "Custom LLMs, computer vision, NLP pipelines, and AI automation that give you a measurable edge.",
    tags: ["LLM Fine-tuning", "Computer Vision", "NLP", "AutoML"],
    color: "blue",
  },
  {
    icon: Globe,
    title: "Web Development",
    slug: "web",
    description:
      "Full-stack applications built with Next.js, React, and TypeScript. From startups to enterprise-scale.",
    tags: ["Next.js", "React", "TypeScript", "REST/GraphQL"],
    color: "violet",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    slug: "mobile",
    description:
      "Native iOS & Android and cross-platform React Native apps with seamless UX and offline support.",
    tags: ["React Native", "Swift", "Kotlin", "Expo"],
    color: "blue",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    slug: "cloud",
    description:
      "AWS, GCP, and Azure architecture, Kubernetes, Terraform IaC, and CI/CD pipelines at any scale.",
    tags: ["AWS", "Kubernetes", "Terraform", "Docker"],
    color: "violet",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    slug: "data",
    description:
      "Data warehouses, real-time dashboards, ETL pipelines, and predictive ML models that drive decisions.",
    tags: ["Snowflake", "dbt", "Apache Spark", "Looker"],
    color: "blue",
  },
  {
    icon: Settings,
    title: "Automation Systems",
    slug: "automation",
    description:
      "Business process automation, RPA, intelligent workflows, and API integrations that save thousands of hours.",
    tags: ["RPA", "n8n", "Zapier", "Custom APIs"],
    color: "violet",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    slug: "security",
    description:
      "Penetration testing, SOC 2 readiness, zero-trust architecture, and 24/7 threat monitoring.",
    tags: ["Pen Testing", "SOC 2", "SIEM", "Zero Trust"],
    color: "blue",
  },
  {
    icon: MessageSquare,
    title: "Tech Consulting",
    slug: "consulting",
    description:
      "CTO advisory, architecture reviews, technical due diligence, and strategic technology roadmaps.",
    tags: ["CTO Advisory", "Architecture", "Due Diligence", "Roadmap"],
    color: "violet",
  },
];

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      ref={ref}
      id="services"
      className="section-padding bg-[#070707] relative overflow-hidden"
      aria-label="Our services"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />

      <div className="container-wide relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="badge-blue mx-auto mb-4"
          >
            <Globe className="w-3 h-3" />
            What we build
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-display-md text-white mb-4"
          >
            Every layer of your{" "}
            <span className="gradient-text">tech stack</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-body-lg"
          >
            From AI models to mobile apps to cloud infrastructure — we cover every
            layer of modern software development.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isBlue = service.color === "blue";
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative card-dark rounded-2xl p-6 flex flex-col hover:border-white/10 transition-all duration-300"
              >
                <div
                  className={`inline-flex p-2.5 rounded-xl border mb-4 w-fit ${
                    isBlue
                      ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                      : "bg-violet-500/10 border-violet-500/20 text-violet-400"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>

                <Link
                  href={`/services#${service.slug}`}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    isBlue
                      ? "text-blue-400/60 hover:text-blue-400"
                      : "text-violet-400/60 hover:text-violet-400"
                  }`}
                >
                  Learn more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            Explore all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
