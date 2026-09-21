"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { createTelLink, createWhatsAppLink } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  quickActions?: Array<{ label: string; href: string; type?: "link" | "tel" | "whatsapp" }>;
}

const DEFAULT_PROMPTS = [
  "Book AC Repair & Servicing",
  "Refrigerator not cooling or leaking",
  "What are your inspection charges?",
  "Check repair warranty details",
];

export function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "contact">("chat");
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Callback form state in Contact Us tab
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackAppliance, setCallbackAppliance] = useState("AC");
  const [callbackSent, setCallbackSent] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, activeTab, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Failed to get AI response");

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply || "Thank you for reaching out! How else can I assist you?",
        time: getCurrentTime(),
        quickActions: data.quickActions,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      // Fallback offline response
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Thank you for asking! For urgent appliance breakdowns, our doorstep engineers are dispatched within 60 to 90 minutes. Would you like to book a visit or call our helpline?",
        time: getCurrentTime(),
        quickActions: [
          { label: "Book a Repair", href: "/#book-repair", type: "link" },
          { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;

    setCallbackLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackName || "Chat Visitor",
          phone: callbackPhone,
          serviceType: callbackAppliance,
          message: `Quick callback request from AI Assistant for ${callbackAppliance} service.`,
        }),
      });

      if (res.ok) {
        setCallbackSent(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCallbackLoading(false);
    }
  };

  const whatsappUrl = createWhatsAppLink(
    SITE_CONFIG.contact.whatsappRaw,
    "Hello Ved Enterprises, I need help with an appliance repair."
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto select-none">
      {/* 1. Floating AI Assistant Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white bg-[#EA580C] hover:bg-[#C2410C] shadow-orange-500/40`}
        aria-label={isOpen ? "Close AI Assistant" : "Open Ved AI Assistant"}
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 stroke-[2.2]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white ring-1 ring-emerald-400/40" />
          </div>
        )}
      </button>

      {/* 2. Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-5 duration-200">
          {/* Header: Pure Solid Orange (#EA580C) */}
          <div className="bg-[#EA580C] text-white px-5 py-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Circular Avatar */}
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <h3 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Ved Assistant
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-orange-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Ved Enterprises</span>
                </div>
              </div>
            </div>

            {/* Header Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Sub-Header Navigation Tabs: "AI Chat" & "Contact Us" */}
          <div className="grid grid-cols-2 bg-white border-b border-slate-200 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`py-3 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "border-[#EA580C] text-[#EA580C] bg-orange-50/40"
                  : "border-transparent hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Chat</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("contact")}
              className={`py-3 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "contact"
                  ? "border-[#EA580C] text-[#EA580C] bg-orange-50/40"
                  : "border-transparent hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* 3. TAB 1: AI CHAT BODY */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#F8FAFC]">
              {/* Scrollable Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
                {/* Initial Welcome Greeting Card (Matches Reference Image) */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
                  <div className="text-slate-800 leading-relaxed font-normal">
                    <p className="font-semibold text-slate-900 mb-1.5 flex items-center gap-1.5">
                      <span>👋 Hi! I&apos;m Ved Assistant, your appliance repair expert for Ved Enterprises.</span>
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      I can help you troubleshoot appliance faults, check repair pricing, book a technician, and guide you through our repair services. How can I help you today?
                    </p>
                  </div>

                  {/* Prompt Suggestion Pills (Pure Orange Border Style) */}
                  <div className="space-y-2 pt-1">
                    {DEFAULT_PROMPTS.map((promptText, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(promptText)}
                        className="w-full text-left px-3.5 py-2 rounded-xl border border-orange-500/40 bg-orange-50/40 hover:bg-orange-100/70 text-orange-950 text-xs font-semibold transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-between"
                      >
                        <span className="truncate pr-2">{promptText}</span>
                        <ArrowRight className="w-3 h-3 text-orange-600 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversation History */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#EA580C] text-white rounded-tr-none font-medium"
                          : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80 font-normal space-y-2"
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>

                      {/* Quick Actions inside Assistant Response */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100 mt-2">
                          {msg.quickActions.map((action, i) => (
                            <Link
                              key={i}
                              href={action.href}
                              onClick={() => {
                                if (action.href.startsWith("/#")) {
                                  setIsOpen(false);
                                }
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#EA580C] font-bold text-[11px] border border-orange-200 transition-colors"
                            >
                              <span>{action.label}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex items-center gap-2 text-slate-500 bg-white border border-slate-200/80 px-3.5 py-2 rounded-2xl rounded-tl-none w-fit text-xs shadow-sm">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EA580C]" />
                    <span>Ved Assistant is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Input Field & Send Button (Matches reference image) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-orange-400/50 focus:border-[#EA580C] focus:bg-white rounded-full text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || loading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                    inputMessage.trim() && !loading
                      ? "bg-[#EA580C] hover:bg-[#C2410C] shadow-md shadow-orange-500/25 active:scale-95"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5 fill-current" />
                </button>
              </form>
            </div>
          )}

          {/* 4. TAB 2: CONTACT US BODY */}
          {activeTab === "contact" && (
            <div className="flex-1 overflow-y-auto p-5 bg-[#F8FAFC] space-y-4 text-xs sm:text-sm">
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-slate-900 text-base">Direct Service Desk</h4>
                <p className="text-xs text-slate-500">Reach our dispatch team immediately for fast assistance.</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white transition-colors flex items-center justify-center mb-1.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">Call Helpline</span>
                  <span className="text-[10px] text-slate-500">{SITE_CONFIG.contact.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center mb-1.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">WhatsApp</span>
                  <span className="text-[10px] text-slate-500">Instant Chat</span>
                </a>
              </div>

              {/* Operating Hours Info */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Clock className="w-4 h-4 text-[#EA580C]" />
                  <span>Working Hours: 8:00 AM - 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>7 Days a week including Sundays</span>
                </div>
              </div>

              {/* Request a Callback Form */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Request a Quick Callback
                </h5>

                {callbackSent ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs space-y-1 text-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                    <p className="font-bold">Callback Requested!</p>
                    <p className="text-[11px] text-emerald-700">Our engineer will call you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#EA580C] focus:bg-white"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="Phone Number *"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#EA580C] focus:bg-white"
                      />
                    </div>
                    <div>
                      <select
                        value={callbackAppliance}
                        onChange={(e) => setCallbackAppliance(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#EA580C] focus:bg-white"
                      >
                        <option value="AC Repair">AC Repair & Servicing</option>
                        <option value="Refrigerator Repair">Refrigerator Repair</option>
                        <option value="Washing Machine Repair">Washing Machine Repair</option>
                        <option value="RO Purifier Service">RO Water Purifier</option>
                        <option value="Microwave Repair">Microwave & Oven</option>
                        <option value="Geyser Repair">Geyser Repair</option>
                        <option value="TV Repair">TV Repair</option>
                        <option value="Other Appliance">Other Home Appliance</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={callbackLoading}
                      className="w-full py-2.5 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer disabled:opacity-70"
                    >
                      {callbackLoading ? "Submitting..." : "Get Call Back →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
