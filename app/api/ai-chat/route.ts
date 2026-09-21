import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";
import { getAiSettings } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    const aiSettings = getAiSettings();
    const apiKey = aiSettings.apiKey?.trim();
    const model = aiSettings.model || "gemini-1.5-flash";
    const provider = aiSettings.provider || "gemini";
    const knowledgeBase = aiSettings.knowledgeBase || "";
    const systemPrompt = aiSettings.systemPrompt || "";

    // 1. If Gemini API Key is configured in Admin, call Google Gemini API directly!
    if (apiKey && provider === "gemini") {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const promptWithContext = `${systemPrompt}\n\nKNOWLEDGE BASE & GUIDELINES:\n${knowledgeBase}\n\nUSER QUESTION: ${message}\n\nPlease answer concisely in 2-4 sentences in friendly, helpful markdown. Emphasize doorstep service, transparent prices, and 60-90 min arrival.`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: promptWithContext }],
              },
            ],
            generationConfig: {
              temperature: aiSettings.temperature || 0.7,
              maxOutputTokens: 350,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (replyText) {
            return NextResponse.json({
              reply: replyText.trim(),
              providerUsed: `Google Gemini (${model})`,
              quickActions: [
                { label: "Book a Repair", href: "/#book-repair", type: "link" },
                { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
              ],
            });
          }
        } else {
          console.warn("Gemini API call returned status", geminiRes.status);
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to local engine:", geminiError);
      }
    }

    // 2. If OpenAI API Key is configured in Admin
    if (apiKey && provider === "openai") {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model || "gpt-4o-mini",
            messages: [
              { role: "system", content: `${systemPrompt}\n\nKNOWLEDGE BASE:\n${knowledgeBase}` },
              { role: "user", content: message },
            ],
            max_tokens: 300,
            temperature: aiSettings.temperature || 0.7,
          }),
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json();
          const replyText = openaiData?.choices?.[0]?.message?.content;
          if (replyText) {
            return NextResponse.json({
              reply: replyText.trim(),
              providerUsed: `OpenAI (${model})`,
              quickActions: [
                { label: "Book a Repair", href: "/#book-repair", type: "link" },
                { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
              ],
            });
          }
        }
      } catch (openaiErr) {
        console.error("OpenAI API call failed, falling back to local engine:", openaiErr);
      }
    }

    // 3. Built-in contextual smart knowledge engine (Fast, zero-latency fallback)
    const query = message.toLowerCase().trim();
    let responseText = "";
    let quickActions: Array<{ label: string; href: string; type?: "link" | "tel" | "whatsapp" }> = [];

    // AC Queries
    if (query.includes("ac") || query.includes("air conditioner") || query.includes("cooling") || query.includes("gas refilling")) {
      responseText = `For **Air Conditioners (Split & Window)**, we offer same-day doorstep diagnostics starting at **₹499**.

Our AC specialists handle:
• Gas leak detection & refilling (R32, R410A, R22)
• Deep foam jet chemical servicing
• Compressor & PCB circuit repairs
• Water leakage and coil cleaning

Would you like to schedule an AC technician visit today?`;
      quickActions = [
        { label: "Book AC Repair", href: "/#book-repair", type: "link" },
        { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
      ];
    }
    // Refrigerator Queries
    else if (query.includes("refrigerator") || query.includes("fridge") || query.includes("freezer") || query.includes("frost")) {
      responseText = `For **Refrigerators (Single door, Double door, & Side-by-Side)**, repairs start from **₹399**.

Common issues we fix at your doorstep:
• Refrigerator not cooling or excessive frost build-up
• Gas leakage and compressor troubleshooting
• Thermostat, sensor, and relay replacement
• Water pooling inside or door gasket damage

We use 100% genuine OEM-grade replacement parts backed by our 30-90 days warranty.`;
      quickActions = [
        { label: "Book Fridge Repair", href: "/#book-repair", type: "link" },
        { label: "Chat on WhatsApp", href: `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`, type: "whatsapp" },
      ];
    }
    // Washing Machine Queries
    else if (query.includes("washing") || query.includes("washer") || query.includes("drain") || query.includes("spin")) {
      responseText = `For **Washing Machines (Front Load, Top Load, & Semi-Automatic)**, repairs start from **₹399**.

Common faults we resolve:
• Machine not spinning, loud vibrating noises, or error codes
• Water drainage blockage or inlet valve issues
• Motor capacitor and belt replacement
• Inverter PCB motherboard diagnostics`;
      quickActions = [
        { label: "Book Washing Machine Fix", href: "/#book-repair", type: "link" },
        { label: "Call Dispatch", href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
      ];
    }
    // RO Water Purifier Queries
    else if (query.includes("ro") || query.includes("purifier") || query.includes("water filter") || query.includes("membrane")) {
      responseText = `For **RO Water Purifiers**, servicing and filter changes start from **₹299**.

Inclusions:
• Sediment & Pre-carbon filter replacement
• High-TDS RO Membrane replacement
• Booster pump & SV valve diagnostics
• Water TDS testing and taste calibration`;
      quickActions = [
        { label: "Book RO Service", href: "/#book-repair", type: "link" },
      ];
    }
    // Geyser / Water Heater Queries
    else if (query.includes("geyser") || query.includes("water heater") || query.includes("heating")) {
      responseText = `For **Electric Geysers & Water Heaters**, repairs start from **₹299**.

We repair heating element failures, thermostat cut-off issues, tank leaks, wiring shorts, and new geyser wall-mounting installations.`;
      quickActions = [
        { label: "Book Geyser Repair", href: "/#book-repair", type: "link" },
        { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
      ];
    }
    // TV Queries
    else if (query.includes("tv") || query.includes("television") || query.includes("led") || query.includes("screen") || query.includes("display")) {
      responseText = `For **LED / LCD / Smart TVs**, diagnostic checks and repairs start from **₹399**.

We fix backlight black screen issues, motherboard circuit faults, sound issues without picture, power board failures, and wall-mounting.`;
      quickActions = [
        { label: "Book TV Repair", href: "/#book-repair", type: "link" },
      ];
    }
    // Microwave Queries
    else if (query.includes("microwave") || query.includes("oven")) {
      responseText = `For **Microwave Ovens (Solo, Grill, & Convection)**, repairs start from **₹299**.

We fix heating failures, sparking, magnetron issues, touchpad unresponsive controls, and faulty turntable motors.`;
      quickActions = [
        { label: "Book Microwave Repair", href: "/#book-repair", type: "link" },
      ];
    }
    // Pricing / Inspection Charges
    else if (query.includes("price") || query.includes("cost") || query.includes("charge") || query.includes("rate") || query.includes("inspection") || query.includes("visiting")) {
      responseText = `Here is our transparent pricing structure:

• **Doorstep Diagnostic / Visiting Fee:** ₹199 *(100% WAIVED if you approve the repair)*
• **RO Purifier Servicing:** from ₹299
• **Microwave / Geyser Repair:** from ₹299
• **Refrigerator / Washing Machine / TV:** from ₹399
• **Air Conditioner (AC) Service:** from ₹499

Our technician gives you a clear itemized quote before starting any work. No hidden charges guaranteed!`;
      quickActions = [
        { label: "View All Pricing", href: "/#services", type: "link" },
        { label: "Book Inspection (₹199)", href: "/#book-repair", type: "link" },
      ];
    }
    // Warranty Queries
    else if (query.includes("warranty") || query.includes("guarantee") || query.includes("after service")) {
      responseText = `Yes! All repairs completed by **Ved Enterprises** include:

🛡️ **30 to 90-Day Post-Service Warranty** on all replacement spare parts and labor workmanship.
If the exact same issue reoccurs during the warranty period, our technician revisits and rectifies it at **zero additional charge**.`;
      quickActions = [
        { label: "Why Choose Us", href: "/why-us", type: "link" },
        { label: "Book with Warranty", href: "/#book-repair", type: "link" },
      ];
    }
    // Arrival Time / Emergency
    else if (query.includes("time") || query.includes("how fast") || query.includes("urgent") || query.includes("emergency") || query.includes("today") || query.includes("same day")) {
      responseText = `⚡ **Fast 60-90 Minute Dispatch!**

For priority and emergency appliance breakdowns, our verified technician arrives at your doorstep within 60 to 90 minutes. We operate 7 days a week from 8:00 AM to 9:00 PM.`;
      quickActions = [
        { label: `Call Now: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
        { label: "Chat on WhatsApp", href: `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`, type: "whatsapp" },
      ];
    }
    // Booking / Contact Queries
    else if (query.includes("book") || query.includes("contact") || query.includes("phone") || query.includes("number") || query.includes("whatsapp")) {
      responseText = `You can easily book a repair or reach our direct dispatch desk:

📞 **Phone Helpline:** ${SITE_CONFIG.contact.phone}
💬 **WhatsApp:** ${SITE_CONFIG.contact.whatsapp}
🕒 **Hours:** 8:00 AM - 9:00 PM (Everyday)

Or click below to schedule an online doorstep appointment in under 30 seconds!`;
      quickActions = [
        { label: "Book Repair Online", href: "/#book-repair", type: "link" },
        { label: `Call: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
      ];
    }
    // Default Fallback
    else {
      responseText = `I can help you with repair, servicing, and installation for all major home appliances:

• **AC Repair & Gas Refill** (from ₹499)
• **Refrigerator Cooling & Compressor** (from ₹399)
• **Washing Machine Spin & Drum** (from ₹399)
• **RO Water Purifier & Filters** (from ₹299)
• **Geyser, Microwave & TV Repair** (from ₹299)

Would you like to know our pricing, check warranty details, or schedule a verified technician visit?`;
      quickActions = [
        { label: "Book a Doorstep Repair", href: "/#book-repair", type: "link" },
        { label: `Call Helpline: ${SITE_CONFIG.contact.phone}`, href: `tel:${SITE_CONFIG.contact.phoneRaw}`, type: "tel" },
      ];
    }

    return NextResponse.json({
      reply: responseText,
      quickActions,
    });
  } catch (error) {
    console.error("AI Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
