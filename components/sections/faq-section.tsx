"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plus, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary by scope. A focused AI feature or MVP typically takes 4–8 weeks. Full enterprise platforms range from 3–6 months. We always provide a detailed project roadmap with milestones during the discovery phase so you have complete visibility.",
  },
  {
    question: "Do you work with early-stage startups or only enterprise?",
    answer:
      "We work across the spectrum. Our Starter plan is designed specifically for seed and Series A startups, while our Enterprise tier serves Fortune 500 companies. What matters to us is that you have a clear vision and a real problem to solve.",
  },
  {
    question: "What does the development process look like?",
    answer:
      "We follow a five-phase process: Discovery & Architecture → Design → Development → QA & Testing → Launch & Support. Each phase has defined deliverables and requires your sign-off before we proceed. You get a dedicated Slack channel and weekly demo calls throughout.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer:
      "You own 100% of everything we build for you — all source code, models, data, and infrastructure configurations. We sign a comprehensive IP assignment agreement before work begins. No exceptions.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Absolutely. We frequently embed alongside existing engineering teams as a force multiplier. Whether you need us to lead architecture, build a specific module, or provide technical mentorship — we adapt to your team structure.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "Our core stack: TypeScript/Next.js (frontend), Python/FastAPI (AI/backend), PostgreSQL/Redis (data), AWS/GCP/Azure (cloud), Kubernetes/Terraform (DevOps). For AI: PyTorch, Hugging Face, LangChain, OpenAI APIs, and fine-tuned open-source models.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. All projects include 30 days of post-launch support at no extra cost. Beyond that, we offer monthly retainer plans covering monitoring, maintenance, feature development, and 24/7 on-call incident response for production systems.",
  },
  {
    question: "How do you handle security and compliance requirements?",
    answer:
      "Security is never an afterthought with us. We design every system with SOC 2, GDPR, HIPAA, and PCI-DSS compliance in mind from day one. We include security audits, penetration testing, and compliance documentation as standard parts of our enterprise engagements.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="faq"
      className="section-padding bg-[#0A0A0A] relative"
      aria-label="Frequently asked questions"
    >
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="badge-blue mx-auto mb-4"
          >
            <HelpCircle className="w-3 h-3" />
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-display-md text-white mb-4"
          >
            Questions we get{" "}
            <span className="gradient-text">all the time</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-body-lg"
          >
            Everything you need to know before starting your project with us.
          </motion.p>
        </div>

        <div className="space-y-2" role="list">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                role="listitem"
              >
                <div
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-blue-500/25 bg-blue-500/4"
                      : "border-white/5 bg-white/2 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span
                      className={`font-medium transition-colors ${
                        isOpen ? "text-white" : "text-white/80"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-400 rotate-45"
                          : "border-white/10 text-white/30"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-question-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/55 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-white/35 text-sm"
        >
          Still have questions?{" "}
          <a
            href="/contact"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Talk to our team →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
