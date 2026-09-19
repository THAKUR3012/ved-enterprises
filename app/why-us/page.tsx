import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  UserCheck,
  Receipt,
  ShieldCheck,
  BadgeCheck,
  Home,
  Check,
  X,
  Phone,
  Calendar,
  Sparkles,
  ArrowRight,
  Award,
  ChevronRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why Choose Us | Ved Enterprises - Reliable Appliance Repairs",
  description:
    "Discover why homeowners trust Ved Enterprises for doorstep AC, refrigerator, washing machine, and appliance repairs. Same-day service, verified technicians, upfront pricing, and service warranty.",
};

export default function WhyUsPage() {
  const corePillars = [
    {
      title: "Quick 60-90 Min Response",
      description:
        "When an essential appliance like a refrigerator or AC breaks down, waiting days isn't an option. We prioritize urgent emergency repair calls with doorstep arrival within 60 to 90 minutes.",
      icon: Clock,
      highlight: "Rapid Dispatch",
    },
    {
      title: "Skilled & Verified Technicians",
      description:
        "All our service engineers are background-verified and thoroughly trained across multi-brand inverter, smart, and conventional home appliances.",
      icon: UserCheck,
      highlight: "Certified Team",
    },
    {
      title: "100% Upfront Transparent Pricing",
      description:
        "No hidden charges or post-service surprises. Our technician conducts a full diagnostic inspection, explains the issue, and provides a clear price quotation for your approval before starting any repair.",
      icon: Receipt,
      highlight: "No Hidden Costs",
    },
    {
      title: "Genuine OEM Spare Parts",
      description:
        "We source direct manufacturer-compatible, high-durability replacement parts. Genuine parts preserve the energy efficiency and lifespan of your appliance.",
      icon: ShieldCheck,
      highlight: "Original Components",
    },
    {
      title: "30 to 90-Day Service Warranty",
      description:
        "We back our workmanship. All eligible parts and labor come with a clear post-service warranty card. If the issue reoccurs within the warranty window, we fix it at zero extra service fee.",
      icon: BadgeCheck,
      highlight: "Guaranteed Satisfaction",
    },
    {
      title: "Doorstep Convenience & Safety",
      description:
        "No transporting bulky appliances to distant workshops. 95% of all diagnostics and repairs are performed directly in your kitchen or living room with strict hygiene standards.",
      icon: Home,
      highlight: "Zero Hassle",
    },
  ];

  const comparisonRows = [
    {
      parameter: "Arrival Time",
      ved: "60 to 90 minutes for priority slots",
      local: "Uncertain; often requires repeated follow-ups",
    },
    {
      parameter: "Pricing Policy",
      ved: "Transparent rate estimate before work begins",
      local: "Arbitrary quotes; hidden charges added later",
    },
    {
      parameter: "Spare Parts Quality",
      ved: "100% genuine OEM/OES components with bill",
      local: "Duplicate, recycled, or unverified parts",
    },
    {
      parameter: "Service Warranty",
      ved: "Written 30 to 90 days warranty coverage",
      local: "Zero warranty; no response after payment",
    },
    {
      parameter: "Technician Background",
      ved: "Background-verified, uniform-clad & trained",
      local: "Untracked freelance mechanics",
    },
    {
      parameter: "Payment Options",
      ved: "UPI, Cards, NetBanking, or Cash after job testing",
      local: "Demand cash upfront before inspection",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#EA580C] transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0F2C59] font-bold">Why Choose Us</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-[#EA580C] text-xs font-bold tracking-wide border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" /> Our Service Standards
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
            Why Choose <span className="text-[#EA580C]">Ved Enterprises?</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Honest diagnostics, verified technicians, transparent rates, and prompt doorstep
            convenience. We take the stress out of home appliance repair.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link href="/#book-repair">
              <Button variant="orange" size="lg" className="w-full sm:w-auto font-bold gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book a Doorstep Repair</span>
              </Button>
            </Link>

            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#EA580C]" />
              <span>Call: {SITE_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. The 6 Core Pillars Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] tracking-tight">
            6 Reasons Families Rely on Us
          </h2>
          <p className="text-sm text-slate-600 font-normal">
            Every service visit is backed by our strict quality protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {corePillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#0F2C59] group-hover:bg-[#0F2C59] group-hover:text-white transition-colors flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold text-[#EA580C] bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2C59] mb-2 group-hover:text-[#EA580C] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Standard on every visit</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Comparison Table: Ved Enterprises vs Others */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Clear Differentiation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] tracking-tight">
              Ved Enterprises vs. Unverified Local Technicians
            </h2>
            <p className="text-sm text-slate-600">
              See the difference professional standards and accountability make.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">Feature</th>
                    <th className="py-4 px-5 font-bold bg-[#0F2C59] text-orange-400 uppercase tracking-wider text-xs">
                      ✓ Ved Enterprises
                    </th>
                    <th className="py-4 px-5 font-bold text-slate-400 uppercase tracking-wider text-xs">
                      ✕ Unverified Mechanics
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={row.parameter}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="py-4 px-5 font-bold text-slate-800">{row.parameter}</td>
                      <td className="py-4 px-5 font-semibold text-[#0F2C59] bg-blue-50/40">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.ved}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-slate-500">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.local}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action Banner */}
      <section className="py-16 bg-[#09090b] text-white border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white mx-auto flex items-center justify-center font-bold shadow-lg shadow-orange-500/30">
            <Award className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready for a Smooth, Hassle-Free Repair?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Book your repair online in 30 seconds or connect directly with our dispatch manager.
            We service all major household brands with same-day appointments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/#book-repair">
              <Button variant="orange" size="lg" className="w-full sm:w-auto font-bold gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book Service Now</span>
              </Button>
            </Link>

            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call Helpline: {SITE_CONFIG.contact.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
