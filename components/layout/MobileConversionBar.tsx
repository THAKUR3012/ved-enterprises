import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink, createWhatsAppLink } from "@/lib/utils";

export function MobileConversionBar() {
  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I need help with my home appliance repair."
  );

  return (
    <aside aria-label="Mobile quick action bar" className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-2 md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 active:bg-slate-200 text-[#0F2C59] font-bold text-xs transition-colors"
        >
          <Phone className="w-4 h-4 text-[#0F2C59] mb-1" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200/60 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-1" />
          <span>WhatsApp</span>
        </a>

        {/* Book Repair Button */}
        <Link
          href="#book-repair"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#EA580C] active:bg-[#C2410C] text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-colors"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span>Book Repair</span>
        </Link>
      </div>
    </aside>
  );
}
