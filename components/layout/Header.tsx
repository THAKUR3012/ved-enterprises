"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  ArrowRight,
  Wind,
  Refrigerator,
  RotateCw,
  Flame,
  Droplets,
  Zap,
  Tv,
  Settings,
  Clock,
  Phone,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, SERVICES_LIST } from "@/lib/constants";
import { createTelLink, formatPrice } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wind,
  Refrigerator,
  RotateCw,
  Flame,
  Droplets,
  Zap,
  Tv,
  Settings,
};

export function Header() {
  const pathname = usePathname();
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Brand Logo (Left) */}
          <Link
            href="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/20 rounded-xl"
            aria-label="Ved Enterprises Home"
          >
            <BrandLogo size="default" />
          </Link>

          {/* 2. Desktop Navigation Links (Center) */}
          <nav className="hidden md:flex items-center space-x-6 xl:space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`text-[15px] font-bold transition-colors py-2 relative ${
                pathname === "/"
                  ? "text-[#EA580C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#EA580C] after:rounded-full"
                  : "text-slate-800 hover:text-[#EA580C]"
              }`}
            >
              Home
            </Link>

            {/* Services with Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`inline-flex items-center gap-1.5 text-[15px] font-bold transition-colors py-2 cursor-pointer ${
                  servicesDropdownOpen
                    ? "text-[#EA580C]"
                    : "text-slate-800 hover:text-[#EA580C]"
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#EA580C]" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[660px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F2C59] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" /> Home Appliance Repairs
                    </span>
                    <Link
                      href="/#services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {SERVICES_LIST.map((service) => {
                      const IconComponent = serviceIcons[service.iconName] || Settings;
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0F2C59] group-hover:bg-[#0F2C59] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0F2C59] truncate">
                                {service.name}
                              </h4>
                              <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                                From {formatPrice(service.startingPrice)}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {service.shortDescription}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> Need urgent same-day service?
                    </span>
                    <a
                      href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                      className="font-bold text-[#0F2C59] hover:text-[#EA580C] transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-[#EA580C]" /> Call {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Why Us */}
            <Link
              href="/why-us"
              className={`text-[15px] font-bold transition-colors py-2 relative ${
                pathname === "/why-us"
                  ? "text-[#EA580C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#EA580C] after:rounded-full"
                  : "text-slate-800 hover:text-[#EA580C]"
              }`}
            >
              Why Us
            </Link>

            {/* How It Works */}
            <Link
              href="/#how-it-works"
              className="text-[15px] font-bold text-slate-800 hover:text-[#EA580C] transition-colors py-2"
            >
              How It Works
            </Link>

            {/* Our Work */}
            <Link
              href="/#gallery"
              className="text-[15px] font-bold text-slate-800 hover:text-[#EA580C] transition-colors py-2"
            >
              Our Work
            </Link>

            {/* Reviews */}
            <Link
              href="/#testimonials"
              className="text-[15px] font-bold text-slate-800 hover:text-[#EA580C] transition-colors py-2"
            >
              Reviews
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`text-[15px] font-bold transition-colors py-2 relative ${
                pathname === "/contact"
                  ? "text-[#EA580C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#EA580C] after:rounded-full"
                  : "text-slate-800 hover:text-[#EA580C]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* 3. Right Side Action: Book a Repair Button Only */}
          <div className="flex items-center">
            <Link href="#book-repair" className="inline-block">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Book a Repair</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
