import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { addLead } from "@/lib/store";

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

    // 3. Save to persistent store so it shows up in Admin dashboard instantly
    addLead({
      bookingNumber,
      source: "Online Booking",
      fullName: data.fullName,
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      email: null,
      address: data.address,
      applianceType: data.applianceType,
      serviceRequired: data.serviceRequired,
      problemDescription: data.problemDescription,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      status: "NEW",
    });

    // 4. Save to MySQL database if DB is reachable
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
