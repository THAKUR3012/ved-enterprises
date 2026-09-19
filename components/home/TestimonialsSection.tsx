import React from "react";
import { Star, CheckCircle, Quote, MessageSquare } from "lucide-react";
import { SAMPLE_TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold tracking-wide border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Customer Satisfaction
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Read candid feedback from homeowners who experienced our on-site diagnosis and repair.
          </p>
          <div className="inline-block bg-blue-50 text-blue-800 text-[11px] font-semibold px-3 py-1 rounded-full border border-blue-200">
            * Sample Testimonials Display (Customizable &amp; manageable from the Admin Panel)
          </div>
        </div>

        {/* Testimonials 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-200 relative group"
            >
              <div>
                {/* Top Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 group-hover:text-orange-400 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6 font-normal">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Author & Appliance Details */}
              <div className="pt-4 border-t border-slate-200/70">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0F2C59]">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">{item.location}</p>
                  </div>
                  {item.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="mt-2.5">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/60 px-2 py-0.5 rounded-md">
                    {item.appliance}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Invitation */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Have you used Ved Enterprises for your appliance repair?{" "}
            <a href="#contact" className="text-[#EA580C] font-bold hover:underline">
              Share your feedback with our service team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
