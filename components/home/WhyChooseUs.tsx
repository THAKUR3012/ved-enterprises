import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  UserCheck,
  Receipt,
  ShieldCheck,
  BadgeCheck,
  Home,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhyChooseUs() {
  const benefits = [
    {
      title: "Quick Response",
      description: "Prompt doorstep arrival within 60 to 90 minutes for urgent appliance breakdowns.",
      icon: Clock,
      badge: "Fast",
    },
    {
      title: "Skilled Technicians",
      description: "Background-verified, certified technicians with comprehensive brand-specific training.",
      icon: UserCheck,
      badge: "Verified",
    },
    {
      title: "Transparent Pricing",
      description: "Upfront pricing quotation after diagnosis with zero hidden charges or surprises.",
      icon: Receipt,
      badge: "Honest",
    },
    {
      title: "Genuine Spare Parts",
      description: "Only original equipment manufacturer (OEM) grade spare components used for longevity.",
      icon: ShieldCheck,
      badge: "100% Genuine",
    },
    {
      title: "Repair Warranty",
      description: "Up to 90-day peace-of-mind service and replacement parts warranty coverage.",
      icon: BadgeCheck,
      badge: "Guaranteed",
    },
    {
      title: "Doorstep Service",
      description: "Convenient inspections and repairs carried out right at your home with minimal disruption.",
      icon: Home,
      badge: "Convenient",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Professional Technician Image with Trust Card */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
              <Image
                src="/images/hero/why-choose-us.jpg"
                alt="Ved Enterprises Certified Technician with Tool Kit"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/80 via-transparent to-transparent" />

              {/* Bottom Overlaid Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F2C59]">Doorstep Quality Assurance</h4>
                    <p className="text-xs text-slate-500">Every repair tested before final handover</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle background decoration accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Heading & 6 Benefits Grid */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[#EA580C] text-xs font-bold tracking-wide border border-orange-200/60">
                <Sparkles className="w-3.5 h-3.5" /> Our Commitment
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
                Why Choose Ved Enterprises?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                We believe in honest diagnostics, punctuality, and lasting repairs. Here is why thousands of
                households trust us with their everyday home appliances.
              </p>
            </div>

            {/* 6 Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-blue-300 hover:bg-white transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2C59] group-hover:bg-[#0F2C59] group-hover:text-white transition-colors flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                        {benefit.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F2C59] mb-1 group-hover:text-[#EA580C] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="#book-repair">
                <Button variant="orange" size="lg" className="gap-2.5 shadow-lg shadow-orange-500/20 font-bold">
                  <Calendar className="w-5 h-5" />
                  <span>Book a Repair</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
