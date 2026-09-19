import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG, SERVICE_AREAS } from "@/lib/constants";
import { createTelLink, createWhatsAppLink } from "@/lib/utils";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/BrandLogo";

export const metadata: Metadata = {
  title: "Contact Us | Ved Enterprises - Appliance Repair & Support",
  description:
    "Contact Ved Enterprises for same-day home appliance repair in your locality. Reach out by phone, WhatsApp chat, or submit an inquiry online.",
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I would like to contact your service desk regarding an appliance repair."
  );

  return (
    <div className="w-full bg-white">
      {/* 1. Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#EA580C] transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#0F2C59] font-bold">Contact Us</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Header */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
            <Phone className="w-3.5 h-3.5 text-[#EA580C]" /> We Are Here to Help
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2C59] tracking-tight">
            Contact <span className="text-[#EA580C]">Ved Enterprises</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Need doorstep repair, maintenance, or pricing details? Reach out through our direct hotline,
            chat on WhatsApp, or send us a message below.
          </p>
        </div>
      </section>

      {/* 3. 3 Direct Action Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct Telephone */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0F2C59] flex items-center justify-center mb-4 group-hover:bg-[#0F2C59] group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2C59] mb-1">Direct Call Helpline</h3>
              <p className="text-xs text-slate-500 mb-4 font-normal">
                Direct phone line with our on-duty service coordinator.
              </p>
              <div className="text-xl font-extrabold text-[#0F2C59] mb-1 font-mono">
                {SITE_CONFIG.contact.phone}
              </div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Mon - Sun: 8:00 AM - 9:00 PM
              </p>
            </div>
            <div className="pt-6">
              <a
                href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#0F2C59] hover:bg-[#091A36] text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" /> Tap to Call Now
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-emerald-50/40 rounded-2xl p-7 border border-emerald-200/70 hover:border-emerald-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-1">WhatsApp Chat Support</h3>
              <p className="text-xs text-slate-500 mb-4 font-normal">
                Share photos, videos, or appliance model plates for instant quote.
              </p>
              <div className="text-xl font-extrabold text-emerald-900 mb-1 font-mono">
                {SITE_CONFIG.contact.whatsapp}
              </div>
              <p className="text-[11px] text-emerald-700 font-bold">
                ✓ Typical response in 5 to 10 minutes
              </p>
            </div>
            <div className="pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Card 3: Service Hub & Workshop */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:border-orange-300 transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <BrandLogo size="sm" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2C59] mb-1">Central Service Hub</h3>
              <p className="text-xs text-slate-500 mb-4 font-normal">
                Operational facility, spares inventory &amp; diagnostic desk.
              </p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-2">
                {SITE_CONFIG.contact.address}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Email: {SITE_CONFIG.contact.email}
              </p>
            </div>
            <div className="pt-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-slate-300 hover:bg-white text-slate-800 font-bold text-xs transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#EA580C]" /> Open on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Split Section: Contact Form (Left) & Operational Details + Map (Right) */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-lg space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Quick Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] tracking-tight mt-1">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                  Have a question, need an AMC quotation, or need specialized parts? Leave your message
                  and our team will get back to you promptly.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Right Column: Business Hours, Emergency Alert & Google Maps View */}
            <div className="lg:col-span-5 space-y-6">
              {/* Emergency Alert Banner */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-6 text-white shadow-lg space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Emergency Breakdown?</h3>
                    <p className="text-xs text-orange-100">Gas leak, sparking, or water overflow</p>
                  </div>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Turn off your main appliance switch immediately and call our priority dispatch desk.
                </p>
                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-[#EA580C] font-extrabold text-xs shadow hover:bg-orange-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Priority Helpline
                </a>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0F2C59] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#EA580C]" /> Business &amp; Dispatch Hours
                </h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Monday - Friday:</span>
                    <span className="font-bold text-[#0F2C59]">8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Saturday - Sunday:</span>
                    <span className="font-bold text-[#0F2C59]">8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-semibold text-slate-700">Emergency Bookings:</span>
                    <span className="font-bold text-emerald-600">24/7 Telephone On-Call</span>
                  </div>
                </div>
              </div>

              {/* Google Maps Visual Embed */}
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F2C59] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#EA580C]" /> Central Hub Location
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Local City</span>
                </div>
                <div className="relative h-56 w-full bg-slate-100">
                  <iframe
                    title="Ved Enterprises Service Hub Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192868!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Areas Overview Strip */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C59]">
              Active Doorstep Coverage Zones
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Technicians stationed across these major residential sectors for immediate dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {SERVICE_AREAS.map((area) => (
              <span
                key={area.id}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{area.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom Booking CTA Strip */}
      <section className="py-14 bg-[#09090b] text-white border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Prefer to Schedule Your Repair Online?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal">
            Select your preferred date, morning/evening slot, and tell us your appliance issue.
            Zero advance payment needed.
          </p>
          <div className="pt-2">
            <Link href="/#book-repair">
              <Button variant="orange" size="lg" className="font-bold gap-2 shadow-lg shadow-orange-500/20">
                <Calendar className="w-4 h-4" />
                <span>Book a Doorstep Repair Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
