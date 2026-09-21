import { NextRequest, NextResponse } from "next/server";
import { getAllLeads, updateLead, deleteLead, Lead } from "@/lib/store";

export async function GET() {
  try {
    const leads = getAllLeads();

    const counts = {
      total: leads.length,
      new: leads.filter((l) => l.status === "NEW").length,
      scheduled: leads.filter((l) => l.status === "SCHEDULED").length,
      completed: leads.filter((l) => l.status === "COMPLETED").length,
      cancelled: leads.filter((l) => l.status === "CANCELLED").length,
    };

    return NextResponse.json({
      success: true,
      counts,
      leads,
    });
  } catch (error) {
    console.error("Error fetching admin leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, assignedTechnician, technicianNotes, estimatedCost } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const updates: Partial<Lead> = {};
    if (status) updates.status = status;
    if (assignedTechnician !== undefined) updates.assignedTechnician = assignedTechnician;
    if (technicianNotes !== undefined) updates.technicianNotes = technicianNotes;
    if (estimatedCost !== undefined) updates.estimatedCost = Number(estimatedCost);

    const updated = updateLead(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: updated,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const deleted = deleteLead(id);
    return NextResponse.json({
      success: deleted,
      message: deleted ? "Lead removed successfully" : "Lead not found",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
