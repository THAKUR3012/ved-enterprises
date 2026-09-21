import { NextRequest, NextResponse } from "next/server";
import { getAiSettings, updateAiSettings } from "@/lib/store";

export async function GET() {
  try {
    const settings = getAiSettings();

    // Mask the API key partially for security when displaying to frontend
    const maskedKey = settings.apiKey
      ? `${settings.apiKey.substring(0, 4)}••••••••${settings.apiKey.slice(-4)}`
      : "";

    return NextResponse.json({
      success: true,
      settings: {
        ...settings,
        hasKey: Boolean(settings.apiKey && settings.apiKey.trim().length > 0),
        maskedKey,
      },
    });
  } catch (error) {
    console.error("Error getting AI settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve AI settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, model, provider, knowledgeBase, systemPrompt, temperature } = body;

    const updates: Record<string, unknown> = {};

    // Only update apiKey if a new non-masked value was supplied
    if (apiKey !== undefined && !apiKey.includes("••••")) {
      updates.apiKey = apiKey.trim();
    }
    if (model) updates.model = model;
    if (provider) updates.provider = provider;
    if (knowledgeBase !== undefined) updates.knowledgeBase = knowledgeBase;
    if (systemPrompt !== undefined) updates.systemPrompt = systemPrompt;
    if (temperature !== undefined) updates.temperature = Number(temperature);

    const updated = updateAiSettings(updates);

    return NextResponse.json({
      success: true,
      message: "AI Assistant configuration saved successfully!",
      settings: {
        ...updated,
        hasKey: Boolean(updated.apiKey && updated.apiKey.trim().length > 0),
        maskedKey: updated.apiKey
          ? `${updated.apiKey.substring(0, 4)}••••••••${updated.apiKey.slice(-4)}`
          : "",
      },
    });
  } catch (error) {
    console.error("Error saving AI settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update AI settings" },
      { status: 500 }
    );
  }
}
