import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink, createWhatsAppLink } from "@/lib/utils";

export function FloatingContactButtons() {
  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I would like to enquire about home appliance repair service."
  );

  return (
    <aside aria-label="Floating direct contact actions" className="hidden md:flex fixed bottom-8 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Call CTA */}
      <a
        href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
        aria-label="Direct Phone Call to Ved Enterprises"
        className="group flex items-center gap-2 bg-[#0F2C59] hover:bg-[#091A36] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
      >
        <Phone className="w-5 h-5 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pr-1">
          Call {SITE_CONFIG.contact.phone}
        </span>
      </a>

      {/* Floating WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Ved Enterprises"
        className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
