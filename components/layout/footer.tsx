"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, ArrowUpRight, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

const FOOTER_LINKS = {
  Services: [
    { label: "AI Solutions", href: "/services#ai" },
    { label: "Web Development", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "Cloud Solutions", href: "/services#cloud" },
    { label: "Data Analytics", href: "/services#data" },
    { label: "Automation", href: "/services#automation" },
    { label: "Cybersecurity", href: "/services#security" },
    { label: "Consulting", href: "/services#consulting" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
  Resources: [
    { label: "Case Studies", href: "/portfolio#case-studies" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Status Page", href: "https://status.karson.ai", external: true },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, href: SITE_CONFIG.links.twitter, label: "Twitter" },
  { icon: Linkedin, href: `https://linkedin.com/company/${SITE_CONFIG.social.linkedin}`, label: "LinkedIn" },
  { icon: Github, href: `https://github.com/${SITE_CONFIG.social.linkedin}`, label: "GitHub" },
  { icon: Mail, href: `mailto:${SITE_CONFIG.links.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-white/5 bg-[#070707]"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container-wide py-16 lg:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600" />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">KARSON</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              We engineer intelligent software solutions that redefine what's possible.
              From AI automation to cloud architecture — built for the future.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white/70 mb-2">
                Stay updated
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/40 transition-colors"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="h-9 px-3.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:border-white/15 hover:bg-white/8 transition-all"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-white/50 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} KARSON, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-white/30">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span>Built with precision & AI by KARSON</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Terms
            </Link>
            <Link href="/legal/cookies" className="text-sm text-white/30 hover:text-white/60 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
