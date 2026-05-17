import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "..", "data", "records.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const records = JSON.parse(raw);
  return NextResponse.json({ records });
}
