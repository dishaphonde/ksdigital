"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitLeadAction } from "@/app/actions/lead";

interface ContactFormProps {
  preselectedService?: string;
  preselectedPlan?: string;
  title?: string;
  subtitle?: string;
}

function ContactFormInner({
  preselectedService,
  preselectedPlan,
  title = "Start Growing With KS Digital",
  subtitle = "Tell us about your brand goals and we'll create a targeted growth plan.",
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Pre-fill state
  const [selectedService, setSelectedService] = useState(
    preselectedService || searchParams.get("service") || searchParams.get("plan") || ""
  );

  useEffect(() => {
    const s = preselectedService || searchParams.get("service") || searchParams.get("plan");
    if (s) setSelectedService(s);
  }, [searchParams, preselectedService, preselectedPlan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Append route context and UTMs
    formData.set("sourcePage", pathname || "/");
    if (searchParams.get("utm_source")) {
      formData.set("utmSource", searchParams.get("utm_source") || "");
    }
    if (searchParams.get("utm_medium")) {
      formData.set("utmMedium", searchParams.get("utm_medium") || "");
    }
    if (searchParams.get("utm_campaign")) {
      formData.set("utmCampaign", searchParams.get("utm_campaign") || "");
    }

    const res = await submitLeadAction(formData);
    setLoading(false);

    if (res.success) {
      setStatus({
        type: "success",
        message:
          res.message ||
          "Inquiry submitted successfully! Our growth team will get back to you within 24 hours.",
      });
      form.reset();
    } else {
      setStatus({
        type: "error",
        message: res.error || "Submission failed. Please check your inputs.",
      });
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

      <div className="mb-8">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      {status.type === "success" ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-xl font-bold text-foreground">
            Inquiry Received!
          </h4>
          <p className="text-sm text-muted max-w-md mx-auto">
            {status.message}
          </p>
          <button
            onClick={() => setStatus({ type: null, message: "" })}
            className="btn-secondary text-xs mt-4"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url_hp">Leave this empty</label>
            <input
              type="text"
              id="website_url_hp"
              name="website_url_hp"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Ketan Sawant"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Company / Website
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company name or URL"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="serviceInterest"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Service of Interest
              </label>
              <select
                id="serviceInterest"
                name="serviceInterest"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#14141F] border border-gray-300 dark:border-white/10 text-foreground focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              >
                <option value="">Select a service / plan...</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Website Design">Website Design</option>
                <option value="Marketing Automation">Marketing Automation</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Basic Plan (₹10,000/mo)">Basic Plan (₹10,000/mo)</option>
                <option value="Professional Plan (₹15,000/mo)">Professional Plan (₹15,000/mo)</option>
                <option value="Exclusive Plan (₹20,000/mo)">Exclusive Plan (₹20,000/mo)</option>
                <option value="Enterprise Custom Plan">Enterprise Custom Plan</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Estimated Monthly Budget
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#14141F] border border-gray-300 dark:border-white/10 text-foreground focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              >
                <option value="">Select monthly budget range...</option>
                <option value="₹10,000 - ₹25,000">₹10,000 – ₹25,000</option>
                <option value="₹25,000 - ₹50,000">₹25,000 – ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000">₹50,000 – ₹1,00,000</option>
                <option value="₹1,00,000+">₹1,00,000+</option>
                <option value="Undetermined / Exploring">Undetermined / Exploring</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
            >
              How can we help your business grow? <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell us about your current marketing channels, goals, and targets..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-gray-300 dark:border-white/10 text-foreground placeholder-muted/50 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm resize-y"
            ></textarea>
          </div>

          {status.type === "error" && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2 text-rose-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-base shadow-glowBlue disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Book a Strategy Call <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground pt-1">
            We value your privacy. Your information is never sold or shared.
          </p>
        </form>
      )}
    </div>
  );
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className="glass-card p-10 text-center text-muted animate-pulse">
          Loading inquiry form...
        </div>
      }
    >
      <ContactFormInner {...props} />
    </Suspense>
  );
}
