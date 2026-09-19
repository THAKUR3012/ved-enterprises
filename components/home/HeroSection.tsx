import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Wrench,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f2c59_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy, Trust Badge & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-[#0F2C59] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span>Trusted Home Appliance Service</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0F2C59] tracking-tight leading-[1.15]">
              Fast &amp; Reliable Home Appliance Repair{" "}
              <span className="text-[#EA580C] underline decoration-[#EA580C]/30 decoration-wavy">
                at Your Doorstep
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Professional repair, servicing and installation for ACs, refrigerators, washing machines,
              RO systems, geysers, TVs and more. Experienced technicians, upfront prices, and guaranteed satisfaction.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link href="#book-repair" className="w-full sm:w-auto">
                <Button
                  variant="orange"
                  size="lg"
                  className="w-full sm:w-auto text-base font-bold shadow-lg shadow-orange-500/25 gap-2.5 h-14 px-8"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Repair</span>
                </Button>
              </Link>

              <a
                href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-xl border-2 border-[#0F2C59] text-[#0F2C59] bg-white hover:bg-slate-50 font-bold text-base transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5 text-[#EA580C]" />
                <span>Call Now: {SITE_CONFIG.contact.phone}</span>
              </a>
            </div>

            {/* Small Trust Bullet Points */}
            <div className="pt-3 border-t border-slate-200/70">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Quick 60-90 Min Response</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Transparent Upfront Pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span>Skilled Verified Technicians</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Floating Trust Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Technician Image */}
              <div className="relative h-[380px] sm:h-[460px] lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/hero/technician-hero.jpg"
                  alt="Professional Home Appliance Repair Technician at Ved Enterprises"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/60 via-transparent to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#0F2C59]">Doorstep Diagnostics</p>
                      <p className="text-[11px] text-slate-500 font-medium">All Major Brands Supported</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-800">{SITE_CONFIG.stats.customerRating}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">Service Rating</span>
                  </div>
                </div>
              </div>

              {/* Floating Trust Card 1: Fast Response */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in zoom-in-90 duration-500">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2C59] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0F2C59]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Fast Response</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">Available Today</div>
                </div>
              </div>

              {/* Floating Trust Card 2: Professional Service */}
              <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in zoom-in-90 duration-700">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-[#EA580C]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Professional Service</div>
                  <div className="text-[11px] text-slate-500 font-semibold">30-90 Days Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
