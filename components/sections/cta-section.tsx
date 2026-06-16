"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-padding bg-[#070707] relative overflow-hidden"
      aria-label="Get started with KARSON"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Glow orbs */}
          <div className="relative mb-10">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl bg-blue-500/15 pointer-events-none"
              aria-hidden="true"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-blue-500/30 bg-blue-500/10"
              aria-hidden="true"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          <h2 className="text-display-lg text-white mb-5 text-balance">
            Ready to build something{" "}
            <span className="gradient-text">extraordinary?</span>
          </h2>
          <p className="text-body-xl text-white/50 mb-10 text-pretty max-w-xl mx-auto">
            Join 200+ companies who trust KARSON to engineer their most critical
            technology. Let&rsquo;s start with a free architecture consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="xl" variant="gradient" className="group">
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact?type=consultation">
              <Button size="xl" variant="outline" className="gap-2.5">
                <Calendar className="w-4 h-4" />
                Schedule a call
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/25">
            Free 30-min consultation · No commitment required · NDA on request
          </p>
        </motion.div>
      </div>
    </section>
  );
}
