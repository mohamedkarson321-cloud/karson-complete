"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CTO",
    company: "NexaTech Ventures",
    avatar: "SC",
    rating: 5,
    content:
      "KARSON transformed our entire data infrastructure in under three months. The AI pipeline they built processes 10 million events per day with 99.97% accuracy. Our engineering team was blown away by the code quality and architecture decisions.",
    metrics: "10M events/day • 3 months delivery",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "VP of Engineering",
    company: "FinanceCore Global",
    avatar: "MR",
    rating: 5,
    content:
      "We hired KARSON to rebuild our fraud detection system using ML. The results exceeded every expectation — 94% accuracy in fraud detection, down from 67% with our legacy system. They delivered ahead of schedule and the documentation was exceptional.",
    metrics: "94% fraud detection • 40% false positive reduction",
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Head of Product",
    company: "HealthSync AI",
    avatar: "PP",
    rating: 5,
    content:
      "The AI diagnostic assistant KARSON built for us has been described by our medical advisors as the most accurate clinical decision support tool they've seen. It handles 50,000 patient queries monthly with HIPAA compliance built in from day one.",
    metrics: "50K monthly users • HIPAA compliant",
  },
  {
    id: 4,
    name: "James Thornton",
    title: "CEO",
    company: "LogiFlow Systems",
    avatar: "JT",
    rating: 5,
    content:
      "KARSON built our entire e-commerce automation platform from scratch. Sales increased 340% in the first quarter after launch. The team's attention to performance — 95 Lighthouse score across the board — directly impacted our conversion rates.",
    metrics: "340% sales increase • 95 Lighthouse score",
  },
  {
    id: 5,
    name: "Emma Larsson",
    title: "Director of Technology",
    company: "Nordic Media Group",
    avatar: "EL",
    rating: 5,
    content:
      "Rebuilding our content recommendation engine with KARSON was the best technical investment we've made. Watch time is up 2.3x, and user retention increased from 28% to 61% month-over-month. Simply outstanding engineering.",
    metrics: "2.3x watch time • 61% M/M retention",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = () =>
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  const active = TESTIMONIALS[activeIndex]!;

  return (
    <section
      ref={ref}
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
      aria-label="Client testimonials"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="badge-violet mx-auto mb-4"
          >
            <Star className="w-3 h-3 fill-current" aria-hidden="true" />
            Client outcomes
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-display-md text-white mb-4"
          >
            Results that define{" "}
            <span className="gradient-text">careers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-body-lg"
          >
            Don&apos;t take our word for it. Here&apos;s what the engineering
            leaders who trust us say.
          </motion.p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-3xl p-8 md:p-12 relative"
              role="article"
              aria-label={`Testimonial from ${active.name}`}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-8 right-8 w-10 h-10 text-blue-500/15"
                aria-hidden="true"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6" aria-label={`${active.rating} out of 5 stars`}>
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-light">
                &ldquo;{active.content}&rdquo;
              </blockquote>

              {/* Metrics pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                {active.metrics}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {active.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{active.name}</p>
                  <p className="text-sm text-white/50">
                    {active.title} · {active.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIndex(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-blue-500 w-6"
                      : "bg-white/15 w-1.5 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/15 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mini testimonial strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto"
        >
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                i === activeIndex
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4"
              }`}
            >
              <p className="text-xs text-white/50 line-clamp-2 mb-2">
                &ldquo;{t.content.slice(0, 80)}…&rdquo;
              </p>
              <p className="text-xs font-medium text-white/70">{t.name}</p>
              <p className="text-xs text-white/30">{t.company}</p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
