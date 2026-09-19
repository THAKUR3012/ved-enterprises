"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Menu, X, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Why Us", href: "/#why-us" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Our Work", href: "/#gallery" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Service Areas", href: "/#service-areas" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#091A36] text-slate-200 text-xs py-2 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center gap-1.5 text-orange-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> Same-Day Doorstep Service Available
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Spare Parts &amp; Service Warranty
            </span>
          </div>
          <div className="flex items-center space-x-5 font-medium">
            <span>Hours: {SITE_CONFIG.contact.workingHours}</span>
            <span className="text-white/30">|</span>
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> {SITE_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5"
            : "bg-white py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-48 sm:w-56 h-12">
              <Image
                src="/images/logo.svg"
                alt="Ved Enterprises - Home Appliance Repair"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#EA580C] transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Call & Book CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#0F2C59] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              aria-label="Call Ved Enterprises"
            >
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#0F2C59] flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Call Now</div>
                <div className="text-xs font-bold text-[#0F2C59]">{SITE_CONFIG.contact.phone}</div>
              </div>
              <span className="xl:hidden">Call Now</span>
            </a>

            <Link href="#book-repair">
              <Button variant="orange" size="default" className="gap-2 shadow-sm font-bold">
                <Calendar className="w-4 h-4" />
                <span>Book a Repair</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls: Call Button + Hamburger Toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="p-2 rounded-lg bg-orange-50 text-[#EA580C] border border-orange-200"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#EA580C] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <a
              href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 text-[#0F2C59] font-bold text-sm border border-blue-200"
            >
              <Phone className="w-4 h-4 text-[#0F2C59]" /> Call {SITE_CONFIG.contact.phone}
            </a>

            <Link
              href="#book-repair"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#EA580C] text-white font-bold text-sm shadow-md shadow-orange-500/20"
            >
              <Calendar className="w-4 h-4" /> Book a Repair Online
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
