import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustedBySection } from "@/components/sections/trusted-by-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "KARSON — AI-Powered Software Development & Technology Solutions",
  description:
    "KARSON builds intelligent software solutions powered by cutting-edge AI. From custom AI development and automation to cloud architecture and cybersecurity — we engineer the future.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <ServicesSection />
      <StatisticsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
