"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  { name: "Microsoft", width: 110 },
  { name: "Amazon", width: 90 },
  { name: "Google", width: 80 },
  { name: "Meta", width: 60 },
  { name: "Stripe", width: 70 },
  { name: "Salesforce", width: 110 },
  { name: "Adobe", width: 75 },
  { name: "Oracle", width: 80 },
  { name: "IBM", width: 55 },
  { name: "SAP", width: 55 },
  { name: "Nvidia", width: 85 },
  { name: "OpenAI", width: 80 },
];

function LogoPlaceholder({ name, width }: { name: string; width: number }) {
  return (
    <div
      className="flex items-center justify-center h-8 opacity-25 hover:opacity-50 transition-opacity duration-300"
      style={{ width }}
      aria-label={name}
      title={name}
    >
      <span className="text-white font-semibold text-sm tracking-wide">
        {name}
      </span>
    </div>
  );
}

export function TrustedBySection() {
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <section
      className="py-16 border-y border-white/5 bg-[#070707]"
      aria-label="Trusted by leading companies"
    >
      <div className="container-wide mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-white/25 uppercase tracking-widest"
        >
          Trusted by innovative companies worldwide
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <motion.div
          className="flex gap-16"
          style={{
            width: "max-content",
            "--duration": "30s",
            "--gap": "4rem",
          } as React.CSSProperties}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          aria-hidden="true"
        >
          {doubled.map((company, i) => (
            <LogoPlaceholder key={`${company.name}-${i}`} {...company} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
