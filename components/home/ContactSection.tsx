import React from "react";
import { Phone, MessageSquare, MapPin, Clock, Mail, ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink, createWhatsAppLink } from "@/lib/utils";

export function ContactSection() {
  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I would like to speak to a technician about an appliance issue."
  );

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0F2C59] text-xs font-bold tracking-wide">
            <Phone className="w-3.5 h-3.5 text-[#EA580C]" /> Direct Dispatch Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Connect With Our Service Team
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Need urgent assistance or have questions about an ongoing repair? Reach out directly
            via phone, WhatsApp, or visit our central customer service hub.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Phone */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0F2C59] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2C59] mb-1">Call for Booking</h3>
              <p className="text-xs text-slate-500 mb-4">
                Instant telephone line with our dispatch manager.
              </p>
              <div className="text-lg font-extrabold text-[#0F2C59] mb-1">
                {SITE_CONFIG.contact.phone}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold">
                Mon - Sun: 8:00 AM - 9:00 PM
              </p>
            </div>
            <div className="pt-6">
              <a
                href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F2C59] hover:bg-[#091A36] text-white font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" /> Tap to Call Now
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-emerald-50/50 rounded-2xl p-7 border border-emerald-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950 mb-1">WhatsApp Chat</h3>
              <p className="text-xs text-slate-500 mb-4">
                Share photos or videos of your appliance issue.
              </p>
              <div className="text-lg font-extrabold text-emerald-900 mb-1">
                {SITE_CONFIG.contact.whatsapp}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold">
                Average reply in 5 - 10 minutes
              </p>
            </div>
            <div className="pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Card 3: Service Hub */}
          <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2C59] mb-1">Service Hub Address</h3>
              <p className="text-xs text-slate-500 mb-4">
                Central operational facility &amp; parts warehouse.
              </p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                {SITE_CONFIG.contact.address}
              </p>
              <p className="text-[11px] text-slate-500">
                Email: {SITE_CONFIG.contact.email}
              </p>
            </div>
            <div className="pt-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 hover:bg-white text-slate-800 font-bold text-xs transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#EA580C]" /> Open on Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Appliance Breakdown Alert Box */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-orange-500/15">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                Emergency Breakdown? Water Leak or Short Circuit?
              </h4>
              <p className="text-xs sm:text-sm text-orange-100">
                Turn off your appliance power switch immediately and call our emergency priority desk.
              </p>
            </div>
          </div>
          <a
            href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-[#EA580C] hover:bg-orange-50 font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95"
          >
            Call Emergency Desk Now
          </a>
        </div>
      </div>
    </section>
  );
}
