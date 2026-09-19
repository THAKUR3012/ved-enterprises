"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Wind,
  Refrigerator,
  RotateCw,
  Flame,
  Droplets,
  Zap,
  Tv,
  Settings,
  Clock,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, SERVICES_LIST } from "@/lib/constants";
import { createTelLink, createWhatsAppLink, formatPrice } from "@/lib/utils";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
        setSidebarOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sidebarOpen]);

  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I need home appliance repair service."
  );

  const navLinks = [
    { label: "Home", href: "/", isActive: pathname === "/" },
    { label: "Why Us", href: "/why-us", isActive: pathname === "/why-us" },
    { label: "How It Works", href: "/#how-it-works", isActive: false },
    { label: "Our Work", href: "/#gallery", isActive: false },
    { label: "Reviews", href: "/#testimonials", isActive: false },
    { label: "Contact", href: "/contact", isActive: pathname === "/contact" },
  ];

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
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`text-[15px] font-bold transition-colors py-2 relative ${
                pathname === "/"
                  ? "text-[#1E40AF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1E40AF] after:rounded-full"
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
                  ? "text-[#1E40AF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1E40AF] after:rounded-full"
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
                  ? "text-[#1E40AF] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#1E40AF] after:rounded-full"
                  : "text-slate-800 hover:text-[#EA580C]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* 3. Right Side Actions: Call Us Widget + Book a Repair Button + Menu Button */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Call Us Widget (Soft blue circular icon + Call Us / Phone number) */}
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="hidden sm:flex items-center gap-3 group focus:outline-none"
              aria-label={`Call us at ${SITE_CONFIG.contact.phone}`}
            >
              <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1E40AF] group-hover:bg-[#1E40AF] group-hover:text-white transition-all flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs text-slate-500 font-medium">Call Us</div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-[#EA580C] transition-colors font-mono">
                  {SITE_CONFIG.contact.phone}
                </div>
              </div>
            </a>

            {/* Book a Repair Button (Orange CTA with Calendar and Arrow Right) */}
            <Link href="#book-repair" className="inline-block">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Book a Repair</span>
                <ArrowRight className="w-4 h-4 shrink-0 hidden xs:inline" />
              </button>
            </Link>

            {/* Menu Button (Hamburger) on far right */}
            <button
              onClick={() => setSidebarOpen(true)}
              type="button"
              className="p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Open full menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Slide-over Drawer (Right Side on Desktop & Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Slide-in Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <BrandLogo size="default" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-1">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
                    pathname === "/" ? "bg-blue-50 text-[#1E40AF]" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                {/* Mobile Services Accordion */}
                <div className="border border-slate-100 rounded-xl overflow-hidden my-1">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    type="button"
                    className="w-full px-4 py-3 text-base font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Our Services ({SERVICES_LIST.length})</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180 text-[#EA580C]" : ""
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                      {SERVICES_LIST.map((srv) => {
                        const IconComp = serviceIcons[srv.iconName] || Settings;
                        return (
                          <Link
                            key={srv.id}
                            href={`/services/${srv.slug}`}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700"
                          >
                            <span className="flex items-center gap-2 truncate">
                              <IconComp className="w-3.5 h-3.5 text-[#0F2C59] shrink-0" />
                              <span className="truncate">{srv.name}</span>
                            </span>
                            <span className="text-[10px] font-extrabold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded shrink-0">
                              ₹{srv.startingPrice}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                <Link
                  href="/why-us"
                  onClick={() => setSidebarOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
                    pathname === "/why-us" ? "bg-blue-50 text-[#1E40AF]" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>Why Choose Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#how-it-works"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between transition-colors"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#gallery"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between transition-colors"
                >
                  <span>Our Work &amp; Gallery</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/#testimonials"
                  onClick={() => setSidebarOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between transition-colors"
                >
                  <span>Customer Reviews</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setSidebarOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
                    pathname === "/contact" ? "bg-blue-50 text-[#1E40AF]" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Direct Contacts in Drawer */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F2C59] font-bold text-sm border border-blue-200 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call: {SITE_CONFIG.contact.phone}
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Bottom Footer Info inside Drawer */}
            <div className="pt-6 border-t border-slate-100 text-center space-y-1 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Ved Enterprises</p>
              <p>Hours: {SITE_CONFIG.contact.workingHours}</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">
                ✓ Same-Day Service • Verified Technicians
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
