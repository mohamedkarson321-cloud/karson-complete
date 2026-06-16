"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp } from "lucide-react";

const STATS = [
  { value: 200, suffix: "+", label: "Global clients", description: "Across 35+ countries" },
  { value: 850, suffix: "M+", label: "API requests/month", description: "Processed at the edge" },
  { value: 99.99, suffix: "%", label: "Uptime guaranteed", description: "Enterprise-grade SLA" },
  { value: 180, suffix: "+", label: "Projects delivered", description: "On time, every time" },
  { value: 40, suffix: "+", label: "AI models deployed", description: "In production globally" },
  { value: 4.9, suffix: "/5", label: "Client satisfaction", description: "Based on 180+ reviews" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatisticsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-padding bg-[#070707] relative overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge-violet mx-auto mb-4"
          >
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
            By the numbers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-md text-white mb-4"
          >
            Scale that speaks for itself
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-body-lg"
          >
            Real numbers from real production systems. No vanity metrics.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {STATS.map((stat, i) => {
            const hasDecimals = !Number.isInteger(stat.value);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative glass rounded-2xl p-7 overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div
                  className="text-display-lg font-bold gradient-text mb-1 tabular-nums"
                  aria-live="polite"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                    decimals={hasDecimals ? 1 : 0}
                  />
                </div>
                <div className="text-base font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/35">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
