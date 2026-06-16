"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X, Zap, Building2, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";

const PLANS = [
  {
    name: "Starter",
    icon: Rocket,
    tagline: "For startups and small teams",
    monthlyPrice: 4900,
    annualPrice: 3900,
    color: "blue",
    features: [
      "Up to 1 active project",
      "Dedicated project manager",
      "Weekly progress calls",
      "Next.js + TypeScript stack",
      "Basic CI/CD pipeline",
      "Shared cloud infrastructure",
      "Standard security baseline",
      "30 days post-launch support",
      "Slack channel access",
      "Basic analytics dashboard",
    ],
    notIncluded: [
      "Custom AI/ML models",
      "Multi-region deployment",
      "SLA guarantees",
      "24/7 on-call support",
    ],
    cta: "Start a project",
    href: "/contact?plan=starter",
  },
  {
    name: "Professional",
    icon: Zap,
    tagline: "For scaling companies",
    monthlyPrice: 12900,
    annualPrice: 9900,
    color: "gradient",
    isPopular: true,
    features: [
      "Up to 3 concurrent projects",
      "Dedicated senior engineer lead",
      "Twice-weekly progress calls",
      "Full AI/ML capabilities",
      "Advanced CI/CD with blue-green deploys",
      "Dedicated cloud environment",
      "SOC 2 aligned security",
      "90 days post-launch support",
      "Priority Slack response (4h)",
      "Advanced analytics & monitoring",
      "Monthly architecture reviews",
      "Performance optimization included",
    ],
    notIncluded: [
      "White-glove onboarding",
      "On-site team visits",
    ],
    cta: "Get started",
    href: "/contact?plan=professional",
  },
  {
    name: "Enterprise",
    icon: Building2,
    tagline: "For large-scale operations",
    monthlyPrice: null,
    annualPrice: null,
    color: "violet",
    features: [
      "Unlimited concurrent projects",
      "Dedicated engineering team (4–12 engineers)",
      "Daily standups and weekly exec reviews",
      "Full AI research and development",
      "Custom infrastructure architecture",
      "Multi-region, multi-cloud deployment",
      "SOC 2 Type II + HIPAA + GDPR",
      "12 months dedicated support",
      "24/7 on-call incident response (15min SLA)",
      "Custom SLA guarantees (99.99% uptime)",
      "Quarterly on-site team visits",
      "Board-level technology reporting",
      "White-label option available",
      "Dedicated security engineer",
    ],
    notIncluded: [],
    cta: "Contact sales",
    href: "/contact?plan=enterprise",
  },
];

const COMPARISONS = [
  { feature: "Concurrent projects", starter: "1", pro: "3", enterprise: "Unlimited" },
  { feature: "AI/ML capabilities", starter: "—", pro: "✓", enterprise: "✓ Advanced" },
  { feature: "Dedicated engineer", starter: "—", pro: "Senior lead", enterprise: "Full team" },
  { feature: "Cloud environment", starter: "Shared", pro: "Dedicated", enterprise: "Multi-region" },
  { feature: "Security compliance", starter: "Baseline", pro: "SOC 2 aligned", enterprise: "SOC 2 + HIPAA" },
  { feature: "Post-launch support", starter: "30 days", pro: "90 days", enterprise: "12 months" },
  { feature: "Uptime SLA", starter: "—", pro: "99.9%", enterprise: "99.99%" },
  { feature: "On-call support", starter: "—", pro: "—", enterprise: "24/7 (15min)" },
  { feature: "Architecture reviews", starter: "—", pro: "Monthly", enterprise: "Weekly" },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">Pricing</div>
          <h1 className="text-display-xl text-white mb-5">
            Transparent pricing,{" "}
            <span className="gradient-text">exceptional value</span>
          </h1>
          <p className="text-body-xl text-white/55 mb-8">
            No hidden fees. No surprise invoices. Fixed-price retainers that let
            you plan and scale with confidence.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/5 border border-white/8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isAnnual ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              aria-pressed={!isAnnual}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isAnnual ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
              aria-pressed={isAnnual}
            >
              Annual
              <span className="text-xs text-emerald-400 font-semibold">Save 25%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const isGradient = plan.color === "gradient";
              const isViolet = plan.color === "violet";

              return (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 flex flex-col ${
                    isGradient
                      ? "bg-gradient-to-b from-blue-500/10 to-violet-500/10 border border-blue-500/30 shadow-glow-blue"
                      : "card-dark"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-xs font-semibold text-white">
                      Most popular
                    </div>
                  )}

                  <div
                    className={`inline-flex p-2.5 rounded-xl border mb-5 w-fit ${
                      isGradient
                        ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                        : isViolet
                        ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                  <p className="text-sm text-white/45 mb-6">{plan.tagline}</p>

                  <div className="mb-6">
                    {price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-display-sm text-white font-bold">
                            ${price.toLocaleString()}
                          </span>
                          <span className="text-white/40 text-sm">/month</span>
                        </div>
                        {isAnnual && (
                          <p className="text-xs text-emerald-400 mt-1">
                            Billed annually · Save ${((plan.monthlyPrice! - plan.annualPrice!) * 12).toLocaleString()}/yr
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-display-sm text-white font-bold">Custom</div>
                    )}
                  </div>

                  <Link href={plan.href} className="mb-8">
                    <Button
                      className="w-full"
                      variant={isGradient ? "gradient" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <div className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isGradient ? "text-blue-400" : isViolet ? "text-violet-400" : "text-blue-400"}`} />
                        {f}
                      </div>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-white/25">
                        <X className="w-4 h-4 mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-[#070707]">
        <div className="container-wide max-w-4xl">
          <h2 className="text-display-sm text-white mb-10 text-center">Plan comparison</h2>
          <div className="glass rounded-2xl overflow-hidden">
            <table className="table-dark w-full" role="table">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 text-white/40">Feature</th>
                  <th className="text-center px-6 py-4 text-white/60">Starter</th>
                  <th className="text-center px-6 py-4 text-blue-400">Pro</th>
                  <th className="text-center px-6 py-4 text-violet-400">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISONS.map((row) => (
                  <tr key={row.feature} className="border-t border-white/5">
                    <td className="px-6 py-3.5 text-sm text-white/60">{row.feature}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-white/40">{row.starter}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-white/70">{row.pro}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-white/80">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
