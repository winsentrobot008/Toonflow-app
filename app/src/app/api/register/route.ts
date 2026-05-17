import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const filePath = path.join(process.cwd(), "..", "data", "users.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(raw);

  users.push({ email, password });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ msg: "User registered successfully!" });
}
