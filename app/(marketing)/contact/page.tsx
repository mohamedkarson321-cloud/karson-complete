"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send, MapPin, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = ["AI Solutions", "Web Development", "Mobile Apps", "Cloud Solutions", "Data Analytics", "Automation", "Cybersecurity", "Consulting", "Other"];
const BUDGETS = ["< $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "$100,000+", "Let's discuss"];
const TIMELINES = ["ASAP", "1–2 months", "2–3 months", "3–6 months", "6+ months", "Flexible"];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Failed to send message. Please try again or email us directly.");
    }
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-blue mx-auto mb-6">Contact</div>
          <h1 className="text-display-xl text-white mb-5">
            Let&rsquo;s build something{" "}
            <span className="gradient-text">extraordinary</span>
          </h1>
          <p className="text-body-xl text-white/55">
            Tell us about your project. We respond to all inquiries within 24 hours
            and include a preliminary assessment for free.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-wide grid lg:grid-cols-5 gap-12">
          {/* Left sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info */}
            <div className="card-dark rounded-2xl p-7 space-y-5">
              {[
                { icon: Mail, label: "Email us", value: "hello@karson.ai", href: "mailto:hello@karson.ai" },
                { icon: Phone, label: "Call us", value: "+1 (800) 527-7660", href: "tel:+18005277660" },
                { icon: MapPin, label: "Visit us", value: "100 Innovation Drive\nSan Francisco, CA 94105", href: null },
                { icon: Clock, label: "Response time", value: "Within 24 hours\nM–F, 9am–6pm PST", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-white/35 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-white/80 hover:text-white transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80 whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="card-dark rounded-2xl p-7">
              <h3 className="font-semibold text-white mb-4">What happens next</h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "We review your brief and research your industry within 24 hours." },
                  { step: "2", text: "A senior engineer schedules a 30-min discovery call with you." },
                  { step: "3", text: "We send a detailed proposal with architecture, timeline, and fixed pricing." },
                  { step: "4", text: "Once approved, we assign your dedicated team and kick off immediately." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs flex items-center justify-center font-bold">
                      {item.step}
                    </span>
                    <p className="text-white/55 pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Message sent!</h2>
                <p className="text-white/55 max-w-sm">
                  Thanks for reaching out. A senior engineer will review your project and
                  get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="glass rounded-3xl p-8 md:p-10">
                <h2 className="text-xl font-bold text-white mb-6">Tell us about your project</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full name"
                      placeholder="Jane Smith"
                      required
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <Input
                      label="Work email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone (optional)"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                    <Input
                      label="Company (optional)"
                      placeholder="Acme Corp"
                      error={errors.company?.message}
                      {...register("company")}
                    />
                  </div>

                  {/* Service selector */}
                  <div className="form-group">
                    <label className="form-label">Service needed (optional)</label>
                    <select
                      className="input-dark w-full"
                      {...register("service")}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Budget range (optional)</label>
                      <select className="input-dark w-full" {...register("budget")}>
                        <option value="">Select budget…</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Timeline (optional)</label>
                      <select className="input-dark w-full" {...register("timeline")}>
                        <option value="">Select timeline…</option>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Subject"
                    placeholder="What are you building?"
                    required
                    error={errors.subject?.message}
                    {...register("subject")}
                  />
                  <Textarea
                    label="Project details"
                    placeholder="Describe your project, challenges, and what success looks like for you. The more detail, the better our proposal."
                    required
                    rows={5}
                    error={errors.message?.message}
                    {...register("message")}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                    Send message
                  </Button>

                  <p className="text-xs text-center text-white/25">
                    By submitting, you agree to our{" "}
                    <a href="/legal/privacy" className="text-white/40 hover:text-white/60">Privacy Policy</a>.
                    We never share your data.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
