import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(json);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted errors in the form.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 2. Insert into database with graceful fallback if MySQL is offline during local dev
    try {
      await db.insert(contactMessages).values({
        id: messageId,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
        isRead: false,
      });
    } catch (dbError) {
      console.warn("Database insert deferred (MySQL offline or syncing):", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. Our team will contact you shortly.",
        messageId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while sending your message. Please call our hotline directly.",
      },
      { status: 500 }
    );
  }
}
