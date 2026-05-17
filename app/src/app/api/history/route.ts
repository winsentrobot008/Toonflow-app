// ============================================================
// Toonflow - History API Route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const records = readJSON("records.json");

    // Return records sorted by date (newest first)
    const sorted = (records || []).sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      { records: sorted },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err: any) {
    console.error("[Toonflow] History error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to load history" },
      { status: 500 }
    );
  }
}
