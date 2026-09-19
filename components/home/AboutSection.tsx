import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Award, Users, MapPin, Star, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { BrandLogo } from "@/components/layout/BrandLogo";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
              <Award className="w-3.5 h-3.5 text-[#EA580C]" /> About Ved Enterprises
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
              Reliable Appliance Service Built Around Your Convenience
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Founded with a mission to eliminate the uncertainty and delays in household appliance repairs,{" "}
                <strong className="text-slate-900 font-semibold">Ved Enterprises</strong> brings certified
                technical expertise directly to your doorstep. We recognize that a malfunctioning refrigerator,
                leaking air conditioner, or broken washing machine disrupts your entire family routine.
              </p>
              <p>
                That is why our operational model is centered around fast dispatch, transparent rate estimates,
                and genuine factory-grade replacement parts. Every service visit is performed with high-grade
                diagnostic tools to identify the root cause—not just superficial quick fixes.
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent estimate before repair</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep repair for maximum convenience</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Original brand-compatible spares</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-90 Days post-service warranty</span>
              </div>
            </div>

            {/* Editable Stats Grid */}
            <div className="pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">
                    {SITE_CONFIG.stats.experienceYears}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Industry Experience
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#EA580C]">
                    {SITE_CONFIG.stats.servicesCompleted}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Repairs Completed
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#0F2C59]">
                    {SITE_CONFIG.stats.serviceAreasCount}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Service Zones
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center">
                  <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400" />
                    <span>{SITE_CONFIG.stats.customerRating}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    Average Rating
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-2 italic">
                * Note: Statistics are customizable via the admin panel.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/appliance-installation.jpg"
                  alt="Ved Enterprises technician servicing home appliances"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C59]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/40 space-y-3">
                  <div className="pb-2 border-b border-slate-100">
                    <BrandLogo size="sm" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F2C59] flex items-center justify-center font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F2C59]">Local Home Care Partner</h4>
                      <p className="text-xs text-slate-500">Dedicated to prompt customer satisfaction</p>
                    </div>
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:underline pt-1"
                  >
                    <span>Visit our local service hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
