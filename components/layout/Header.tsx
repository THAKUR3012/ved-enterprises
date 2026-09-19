"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Phone,
  Calendar,
  Menu,
  X,
  Clock,
  ShieldCheck,
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
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, SERVICES_LIST } from "@/lib/constants";
import { createTelLink, createWhatsAppLink, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position for sticky header elevation & background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I need home appliance repair service."
  );

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP ANNOUNCEMENT & RAPID HELPLINE STRIP (Desktop & Tablet) */}
      <div className="bg-[#09090b] text-slate-200 text-xs py-2 px-4 hidden lg:block border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Trust & Speed Badges */}
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center gap-1.5 text-orange-400 font-bold">
              <Clock className="w-3.5 h-3.5 animate-pulse" /> Same-Day Doorstep Service in 60-90 Mins
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Spare Parts &amp; Warranty
            </span>
            <span className="text-slate-400 hidden xl:inline">
              Serving All Residential Sectors &amp; Localities
            </span>
          </div>

          {/* Right: Working Hours, WhatsApp & Direct Phone */}
          <div className="flex items-center space-x-5 font-semibold">
            <span className="text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> {SITE_CONFIG.contact.workingHours}
            </span>
            <span className="text-white/20">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
            <span className="text-white/20">|</span>
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1.5 font-bold"
            >
              <Phone className="w-3 h-3" /> Helpline: {SITE_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVBAR */}
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2.5 border-b border-slate-200/80"
            : "bg-white py-3.5 border-b border-slate-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <Link href="/" className="group focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/20 rounded-xl">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Home
            </Link>

            {/* Services with Interactive Mega-Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  servicesDropdownOpen
                    ? "text-[#EA580C] bg-orange-50"
                    : "text-slate-700 hover:text-[#EA580C] hover:bg-slate-50"
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#EA580C]" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#EA580C]" />
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F2C59]">
                        All Home Appliance Repair Services
                      </span>
                    </div>
                    <Link
                      href="/#services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* 8 Services Grid inside Dropdown */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {SERVICES_LIST.map((service) => {
                      const IconComponent = serviceIcons[service.iconName] || Settings;
                      return (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-blue-100/70 text-[#0F2C59] group-hover:bg-[#0F2C59] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mt-0.5">
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

                  {/* Dropdown Bottom Assistance Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> Need emergency doorstep service?
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

            <Link
              href="/#why-us"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Why Us
            </Link>
            <Link
              href="/#how-it-works"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#gallery"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Our Work
            </Link>
            <Link
              href="/#testimonials"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/#service-areas"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Service Areas
            </Link>
            <Link
              href="/#contact"
              className="px-3 py-2 rounded-lg text-sm font-bold text-slate-700 hover:text-[#EA580C] hover:bg-slate-50 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right CTAs: "Call Now" and "Book a Repair" */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Call Now with Live Pulse Badge */}
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 text-sm font-bold text-[#0F2C59] hover:bg-blue-50 rounded-xl transition-all border border-slate-200/90 shadow-sm group"
              aria-label="Call Ved Enterprises"
            >
              <div className="relative w-8 h-8 rounded-lg bg-blue-100/70 text-[#0F2C59] flex items-center justify-center group-hover:bg-[#0F2C59] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <div className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                  Call Now
                </div>
                <div className="text-xs font-extrabold text-[#0F2C59] group-hover:text-[#EA580C] transition-colors">
                  {SITE_CONFIG.contact.phone}
                </div>
              </div>
              <span className="xl:hidden text-xs">Call Now</span>
            </a>

            {/* Book a Repair Orange Primary Button */}
            <Link href="#book-repair">
              <Button
                variant="orange"
                size="default"
                className="gap-2 shadow-md shadow-orange-500/20 font-bold h-11 px-5 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Repair</span>
              </Button>
            </Link>
          </div>

          {/* 3. MOBILE RIGHT CONTROLS: Logo (on left), Call button, Book Now, and Menu button (Exactly as specified) */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Mobile Call Button */}
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="p-2.5 rounded-xl bg-blue-50 text-[#0F2C59] border border-blue-200 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile Book Now Button */}
            <Link
              href="#book-repair"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EA580C] text-white font-bold text-xs shadow-sm active:scale-95 transition-transform"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 border border-slate-200 active:scale-95 transition-transform cursor-pointer"
              aria-label="Toggle navigation drawer"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE FULL-FEATURED DRAWER & SLIDE-OVER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative bg-white w-full max-h-[85vh] rounded-t-3xl overflow-y-auto shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300 z-10">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <BrandLogo />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Expandable Services Accordion */}
              <div className="border border-slate-100 rounded-xl overflow-hidden my-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  type="button"
                  className="w-full px-4 py-3 text-base font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EA580C]" />
                    <span>Our Services ({SERVICES_LIST.length})</span>
                  </span>
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
                          onClick={() => setMobileMenuOpen(false)}
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
                href="/#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Why Choose Us</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Our Work &amp; Gallery</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Customer Reviews</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#service-areas"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Service Areas</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] flex items-center justify-between transition-colors"
              >
                <span>Contact Desk</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Action Buttons in Drawer */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              {/* Call Now */}
              <a
                href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0F2C59] font-extrabold text-sm border border-blue-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0F2C59]" /> Call Helpline: {SITE_CONFIG.contact.phone}
              </a>

              {/* WhatsApp Chat */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-sm border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> Chat on WhatsApp
              </a>

              {/* Book Online CTA */}
              <Link
                href="#book-repair"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <Calendar className="w-4 h-4" /> Book a Repair Online
              </Link>
            </div>

            {/* Trust and hours footnote in mobile menu */}
            <div className="pt-2 text-center text-xs text-slate-400 font-medium">
              <p>Operating: {SITE_CONFIG.contact.workingHours}</p>
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
