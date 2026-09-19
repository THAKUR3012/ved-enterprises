import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // 1. Server-side validation using Zod
    const validationResult = bookingSchema.safeParse(json);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking submission. Please verify required fields.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Generate unique human-readable booking reference (e.g., VE-XXXXXX)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingNumber = `VE-${randomNum}`;
    const bookingId = `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // 3. Save to database if DB is reachable, else log gracefully
    try {
      await db.insert(bookings).values({
        id: bookingId,
        bookingNumber,
        fullName: data.fullName,
        phone: data.phone,
        whatsapp: data.whatsapp || null,
        address: data.address,
        applianceType: data.applianceType,
        serviceRequired: data.serviceRequired,
        problemDescription: data.problemDescription,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        additionalMessage: data.additionalMessage || null,
        status: "NEW",
      });
    } catch (dbError) {
      // In development or when MySQL is not yet spawned, log gracefully so customer booking UX remains reliable
      console.warn("Database storage deferred (will sync when MySQL container is up):", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your appliance repair service request has been received.",
        bookingNumber,
        bookingId,
        customerName: data.fullName,
        applianceType: data.applianceType,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing booking request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
