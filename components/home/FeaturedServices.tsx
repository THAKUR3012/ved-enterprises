"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wind,
  Refrigerator,
  RotateCw,
  Droplets,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Phone,
  ArrowRight,
} from "lucide-react";
import { SERVICES_LIST, SITE_CONFIG } from "@/lib/constants";
import { formatPrice, createTelLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FeaturedServices() {
  const featuredSlugs = [
    "ac-repair",
    "refrigerator-repair",
    "washing-machine-repair",
    "ro-service",
  ];

  const featured = SERVICES_LIST.filter((s) => featuredSlugs.includes(s.slug));
  const [activeTab, setActiveTab] = useState(featured[0]?.id || "srv-ac");

  const currentService = featured.find((s) => s.id === activeTab) || featured[0];

  const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {
    "srv-ac": Wind,
    "srv-ref": Refrigerator,
    "srv-wm": RotateCw,
    "srv-ro": Droplets,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
            High-Demand Repairs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Featured Appliance Specializations
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Detailed breakdown of our most requested home appliance repair and maintenance services.
          </p>
        </div>

        {/* Interactive Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {featured.map((item) => {
            const IconComponent = iconLookup[item.id] || Wind;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                className={`inline-flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0F2C59] text-white shadow-lg shadow-blue-900/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? "text-orange-400" : "text-slate-500"}`} />
                <span>{item.name.replace(" & Servicing", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Detail Card */}
        {currentService && (
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Large Image with Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-white">
                <Image
                  src={currentService.image}
                  alt={currentService.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-orange-300">
                      Guaranteed Workmanship
                    </span>
                    <h4 className="text-xl font-bold text-white">{currentService.name}</h4>
                  </div>
                  <div className="bg-white/90 backdrop-blur-md text-[#0F2C59] px-3.5 py-1.5 rounded-xl font-extrabold text-sm shadow-md">
                    From {formatPrice(currentService.startingPrice)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions, Common Problems & Included Tasks */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] mb-3">
                  {currentService.name}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {currentService.fullDescription}
                </p>
              </div>

              {/* Two Column details: Common Problems vs Included Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Common Problems */}
                <div className="bg-white rounded-xl p-4 border border-slate-200/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Common Issues Fixed
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentService.commonProblems.map((prob, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services Included */}
                <div className="bg-white rounded-xl p-4 border border-slate-200/70">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Service Inclusions
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentService.featuresIncluded.map((feat, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="#book-repair">
                  <Button variant="orange" size="default" className="font-bold gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book This Service</span>
                  </Button>
                </Link>

                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0F2C59]" />
                  <span>Call Technician</span>
                </a>

                <Link
                  href={`/services/${currentService.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F2C59] hover:text-[#EA580C] ml-auto"
                >
                  <span>Full Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
