import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const filePath = path.join(process.cwd(), "..", "data", "users.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(raw);

  const user = users.find(
    (u: { email: string; password: string }) =>
      u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ msg: "Login successful!" });
}
