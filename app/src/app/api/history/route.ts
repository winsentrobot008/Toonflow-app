import { NextRequest, NextResponse } from "next/server";
import { readJSON } from "@/lib/storage";

export async function GET(req: NextRequest) {
  try {
    const records = readJSON("records.json");
    return NextResponse.json({ records });
  } catch (err: any) {
    console.error("History error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
