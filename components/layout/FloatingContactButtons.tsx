import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createWhatsAppLink } from "@/lib/utils";

export function FloatingContactButtons() {
  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I would like to enquire about home appliance repair service."
  );

  return (
    <aside
      aria-label="Floating WhatsApp contact button"
      className="fixed bottom-6 right-6 z-40 pointer-events-auto"
    >
      {/* Floating WhatsApp CTA Only */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Ved Enterprises"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white" />
      </a>
    </aside>
  );
}
