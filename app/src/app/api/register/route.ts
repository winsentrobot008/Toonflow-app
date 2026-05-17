import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readJSON, writeJSON } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 参数校验
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Email and password must be strings" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // 读取已有用户
    const users = readJSON("users.json");

    // 检查是否已注册
    const exists = users.some((u: any) => u.email === email);
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // 对密码加盐哈希
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    // 保存用户
    users.push({
      email,
      salt,
      hash,
      createdAt: new Date().toISOString(),
    });
    writeJSON("users.json", users);

    return NextResponse.json(
      { msg: "User registered successfully!" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
