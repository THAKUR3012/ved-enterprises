"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Search, CheckCircle2, Phone, Calendar, ArrowRight } from "lucide-react";
import { SERVICE_AREAS, SITE_CONFIG } from "@/lib/constants";
import { createTelLink } from "@/lib/utils";

export function ServiceAreasSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAreas = SERVICE_AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="service-areas" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-wide border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Doorstep Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Home Appliance Service Near You
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            We provide fast on-site repair and maintenance throughout our active service zones.
            Check your location below for same-day availability.
          </p>
        </div>

        {/* Search / Filter Area */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your sector, locality or landmark..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F2C59] focus:bg-white focus:ring-2 focus:ring-[#0F2C59]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area) => (
              <div
                key={area.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#0F2C59]/40 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-[#0F2C59] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0F2C59]">
                      {area.name}
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Same-Day Active
                    </span>
                  </div>
                </div>

                <Link
                  href="#book-repair"
                  className="text-xs font-bold text-slate-400 hover:text-[#EA580C] p-1.5 transition-colors"
                  aria-label={`Book repair in ${area.name}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-slate-500">
              <p className="text-sm">No specific zone matched your search keyword.</p>
              <p className="text-xs text-slate-400 mt-1">
                Don&apos;t worry—call our dispatch helpline directly to check immediate technician coverage.
              </p>
            </div>
          )}
        </div>

        {/* Can't find your area card */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0F2C59] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold">
              Not sure if your specific locality is covered?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our mobile technicians travel across neighboring sectors. Call us for instant confirmation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="px-5 py-2.5 rounded-xl bg-white text-[#0F2C59] font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
            <Link
              href="#book-repair"
              className="px-5 py-2.5 rounded-xl bg-[#EA580C] text-white font-bold text-xs hover:bg-[#C2410C] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
