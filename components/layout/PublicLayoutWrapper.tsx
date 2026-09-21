"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { AiChatAssistant } from "@/components/chat/AiChatAssistant";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // For admin pages, do NOT render public navbar, footer, WhatsApp, or AI chat assistant
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContactButtons />
      <AiChatAssistant />
      <MobileConversionBar />
    </>
  );
}
