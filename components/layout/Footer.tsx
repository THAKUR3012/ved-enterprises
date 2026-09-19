import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG, SERVICES_LIST, SERVICE_AREAS } from "@/lib/constants";
import { createTelLink } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#091A36] text-slate-300 border-t border-slate-800 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <div className="relative w-56 h-12">
              <Image
                src="/images/logo.svg"
                alt="Ved Enterprises Logo"
                fill
                className="object-contain object-left brightness-125"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Ved Enterprises delivers rapid, certified, and affordable doorstep home appliance
              repair and maintenance. We use 100% genuine spare parts backed by our satisfaction warranty.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-orange-400 bg-orange-950/60 px-3 py-1.5 rounded-full border border-orange-800/50 font-medium">
                <Clock className="w-3.5 h-3.5" /> Same-Day Repair Available
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-300 bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-800/50 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Service Warranty
              </span>
            </div>
            <div className="flex items-center space-x-3 pt-1">
              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-orange-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-orange-500/40 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Services
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Recent Work
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#book-repair" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-orange-500" /> Book a Repair
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 pt-2 text-xs">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-orange-500/40 pb-2 inline-block">
              Repair Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_LIST.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-orange-500/70" /> {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-orange-500/40 pb-2 inline-block">
              Contact &amp; Support
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                <span className="text-slate-300 text-xs leading-relaxed">
                  {SITE_CONFIG.contact.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="hover:text-orange-400 text-white font-semibold transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-orange-400 transition-colors text-xs"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <p className="text-xs text-slate-400 mb-1 font-medium">Service Areas Covered:</p>
                <p className="text-xs text-slate-300 line-clamp-3">
                  {SERVICE_AREAS.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} Ved Enterprises. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <span className="text-slate-400 font-mono">Official Local Service Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
