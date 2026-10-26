"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Linkedin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07070B] border-t border-white/10 text-muted pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C2FF" />
                    <stop offset="100%" stopColor="#7B2FFF" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,5 95,25 95,75 50,95 5,75 5,25"
                  stroke="url(#footer-logo-grad)"
                  strokeWidth="5"
                />
                <polygon
                  points="50,15 80,32 80,68 50,85 20,68 20,32"
                  stroke="url(#footer-logo-grad)"
                  strokeWidth="2.5"
                  opacity="0.5"
                />
                <path d="M45,25 L65,42 L52,48 L62,75 L38,53 L50,47 Z" fill="url(#footer-logo-grad)" />
              </svg>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                KS <span className="gradient-text">Digital</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm leading-relaxed text-gray-400">
              Boost your online presence with digital marketing services. Smart strategies, data integrity, and scalable customer acquisition.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/ksdigital.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow KS Digital on Instagram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ksdigital-performance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with KS Digital on LinkedIn"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="tel:+917276503159"
                aria-label="Call KS Digital"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:sawantketan87@gmail.com"
                aria-label="Email KS Digital"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/performance-marketing" className="hover:text-brand-blue transition-colors">
                  Performance Marketing
                </Link>
              </li>
              <li>
                <Link href="/seo-services" className="hover:text-brand-blue transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/social-media-marketing" className="hover:text-brand-blue transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/website-design" className="hover:text-brand-blue transition-colors">
                  Website Design
                </Link>
              </li>
              <li>
                <Link href="/marketing-automation" className="hover:text-brand-blue transition-colors">
                  Marketing Automation
                </Link>
              </li>
              <li>
                <Link href="/graphic-design" className="hover:text-brand-blue transition-colors">
                  Graphic Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-brand-blue transition-colors">
                  About Us & Team
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-blue transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-blue transition-colors">
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-blue transition-colors">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-brand-blue transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Col */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                Direct Line:{" "}
                <a href="tel:+917276503159" className="text-white hover:text-brand-blue font-medium block">
                  +91 7276503159
                </a>
              </p>
              <p className="text-gray-400">
                Email:{" "}
                <a href="mailto:sawantketan87@gmail.com" className="text-white hover:text-brand-blue font-medium block">
                  sawantketan87@gmail.com
                </a>
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-brand-blue transition-colors opacity-70 hover:opacity-100"
                >
                  Admin Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} KS Digital. All rights reserved.</p>
          <p>Engineered for high-performance organic and paid business growth.</p>
        </div>
      </div>
    </footer>
  );
}
