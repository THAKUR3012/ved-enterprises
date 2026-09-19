import React from "react";
import Link from "next/link";
import { ClipboardList, UserCheck, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  const stepIcons = [ClipboardList, UserCheck, Wrench, CheckCircle];

  return (
    <section id="how-it-works" className="py-20 bg-[#09090b] text-white relative overflow-hidden border-y border-zinc-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold tracking-wide border border-white/10">
            Hassle-Free Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Getting your appliance running again is straightforward. No waiting around or hidden surprises.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HOW_IT_WORKS.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div
                key={step.step}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-orange-500/50 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step Number Top Pill */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-orange-400 tracking-wider font-mono">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-[#EA580C] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator line */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Step {idx + 1} of 4</span>
                  {idx < 3 ? (
                    <span className="text-slate-500">Next →</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">Done ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Trigger */}
        <div className="mt-14 text-center">
          <Link
            href="#book-repair"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-xl shadow-orange-500/20 transition-all active:scale-95"
          >
            <span>Book Your Repair Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
