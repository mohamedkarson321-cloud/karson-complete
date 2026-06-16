"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const FLOATING_TAGS = [
  { text: "Neural Networks", x: "8%", y: "25%", delay: 0 },
  { text: "Cloud Native", x: "80%", y: "18%", delay: 0.3 },
  { text: "Zero-Shot AI", x: "5%", y: "70%", delay: 0.6 },
  { text: "LLM Fine-tuning", x: "75%", y: "72%", delay: 0.2 },
  { text: "Real-time ML", x: "15%", y: "50%", delay: 0.8 },
  { text: "AutoML", x: "82%", y: "45%", delay: 0.5 },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-mesh"
      aria-label="Hero section"
    >
      {/* Grid background */}
      <div className="absolute inset-0 hero-lines opacity-100" aria-hidden="true" />

      {/* Aurora blobs */}
      <div className="aurora-container" aria-hidden="true">
        <motion.div
          className="aurora-blob w-[600px] h-[600px] bg-blue-500 top-[-100px] right-[-100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob w-[500px] h-[500px] bg-violet-500 bottom-[-50px] left-[-50px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-blob w-[300px] h-[300px] bg-blue-400 top-[40%] left-[40%]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating tags — desktop only */}
      <div className="hidden xl:block" aria-hidden="true">
        {FLOATING_TAGS.map((tag) => (
          <motion.div
            key={tag.text}
            className="absolute tag text-xs"
            style={{ left: tag.x, top: tag.y }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tag.delay + 1, duration: 0.6 }}
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tag.delay,
              }}
              className="inline-block"
            >
              {tag.text}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-wide pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/25 bg-blue-500/8 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span className="text-xs font-medium text-blue-400 tracking-wide">
              AI-FIRST SOFTWARE COMPANY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display-xl md:text-display-2xl text-white mb-6 text-balance"
          >
            We build software
            <br />
            <span className="gradient-text">intelligent by design</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-body-xl text-white/55 mb-10 max-w-2xl mx-auto text-pretty"
          >
            KARSON engineers AI-powered platforms, cloud infrastructure, and
            automation systems that make industry leaders faster, smarter, and
            unstoppable.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/contact">
              <Button size="xl" variant="gradient" className="group">
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="xl" variant="outline" className="group gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/15 transition-colors">
                  <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                </span>
                See our work
              </Button>
            </Link>
          </motion.div>

          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-white/35"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {[0,1,2,3,4].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-[#0A0A0A] bg-gradient-to-br from-blue-400 to-violet-500"
                    style={{ zIndex: 5 - i }}
                  />
                ))}
              </div>
              <span>200+ clients globally</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>4.9/5 rating across 180+ projects</span>
            </div>
          </motion.div>
        </div>

        {/* Hero visual — code/AI preview card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 relative max-w-4xl mx-auto"
          aria-hidden="true"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-blue-500/15 via-violet-500/10 to-blue-500/15 rounded-3xl" />

          <div className="glass rounded-2xl overflow-hidden border border-white/8">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-white/20 font-mono">karson_ai_engine.py</span>
            </div>

            {/* Code preview */}
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <div className="space-y-1">
                {[
                  { indent: 0, code: <><span className="text-violet-400">from</span> <span className="text-blue-300">karson</span> <span className="text-violet-400">import</span> <span className="text-white">AIEngine, AutoScale</span></> },
                  { indent: 0, code: <></> },
                  { indent: 0, code: <><span className="text-white/30"># Initialize KARSON intelligence layer</span></> },
                  { indent: 0, code: <><span className="text-amber-400">engine</span> <span className="text-white">=</span> <span className="text-blue-300">AIEngine</span><span className="text-white">(</span></> },
                  { indent: 2, code: <><span className="text-white/60">model</span><span className="text-white">=</span><span className="text-emerald-400">&quot;karson-ultra-v3&quot;</span><span className="text-white">,</span></> },
                  { indent: 2, code: <><span className="text-white/60">auto_scale</span><span className="text-white">=</span><span className="text-amber-400">AutoScale</span><span className="text-white">.</span><span className="text-blue-300">ENTERPRISE</span><span className="text-white">,</span></> },
                  { indent: 2, code: <><span className="text-white/60">latency_sla</span><span className="text-white">=</span><span className="text-emerald-400">50</span><span className="text-white/40">,  </span><span className="text-white/30"># ms p99</span></> },
                  { indent: 0, code: <><span className="text-white">)</span></> },
                  { indent: 0, code: <></> },
                  { indent: 0, code: <><span className="text-white/30"># Deploy with zero downtime</span></> },
                  { indent: 0, code: <><span className="text-amber-400">result</span> <span className="text-white">=</span> <span className="text-violet-400">await</span> <span className="text-amber-400">engine</span><span className="text-white">.</span><span className="text-blue-300">deploy</span><span className="text-white">(</span><span className="text-white/60">environment</span><span className="text-white">=</span><span className="text-emerald-400">&quot;production&quot;</span><span className="text-white">)</span></> },
                  { indent: 0, code: <><span className="text-white/30"># → Deployment successful: 847ms • 99.99% uptime guaranteed</span></> },
                ].map((line, i) => (
                  <div key={i} className="flex" style={{ paddingLeft: line.indent * 16 }}>
                    <span className="text-white/15 select-none w-8 shrink-0 text-right pr-4">{i + 1}</span>
                    <span className="text-white/80">{line.code}</span>
                  </div>
                ))}
              </div>

              {/* Live status bar */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Live • Production</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-white/30">
                  <span>Requests: <span className="text-white/60">142.8M/mo</span></span>
                  <span>Uptime: <span className="text-white/60">99.99%</span></span>
                  <span>Latency: <span className="text-white/60">12ms</span></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
