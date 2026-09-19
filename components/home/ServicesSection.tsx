import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Wind,
  Refrigerator,
  RotateCw,
  Flame,
  Droplets,
  Zap,
  Tv,
  Settings,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { SERVICES_LIST } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

// Map icon string to Lucide component
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wind,
  Refrigerator,
  RotateCw,
  Flame,
  Droplets,
  Zap,
  Tv,
  Settings,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" /> Expert Appliance Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Home Appliance Repair Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Reliable repair and servicing for the appliances your home depends on.
            Same-day doorstep service by certified professionals.
          </p>
        </div>

        {/* Services 8-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICES_LIST.map((service) => {
            const IconComponent = iconMap[service.iconName] || Settings;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Card Top: Image & Badge */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.image}
                      alt={`${service.name} in your local area`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Icon Badge Overlay */}
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#0F2C59]">
                      <IconComponent className="w-5 h-5 text-[#0F2C59]" />
                    </div>

                    {/* Optional Highlight Badge */}
                    {service.badge && (
                      <span className="absolute top-3 right-3 text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#EA580C] text-white shadow-sm">
                        {service.badge}
                      </span>
                    )}

                    {/* Bottom Price Strip inside Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-xs font-medium text-slate-200">Starting from</span>
                      <span className="text-sm font-extrabold text-orange-300">
                        {formatPrice(service.startingPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#0F2C59] group-hover:text-[#EA580C] transition-colors mb-2">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 font-normal">
                      {service.shortDescription}
                    </p>

                    {/* Quick problem bullet snippet */}
                    <div className="border-t border-slate-100 pt-3 mb-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-orange-500" /> Common Fixes
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {service.commonProblems.slice(0, 2).map((prob, i) => (
                          <li key={i} className="line-clamp-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Links */}
                <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F2C59] group-hover:text-[#EA580C] transition-colors"
                  >
                    <span>View Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={`#book-repair`}
                    className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for custom/commercial appliance requests */}
        <div className="mt-12 bg-blue-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">Have another home appliance or model?</h4>
            <p className="text-sm text-slate-300">
              Our technicians service nearly all major residential and commercial appliances.
            </p>
          </div>
          <Link
            href="#book-repair"
            className="shrink-0 bg-[#EA580C] hover:bg-[#C2410C] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Custom Repair Request →
          </Link>
        </div>
      </div>
    </section>
  );
}
