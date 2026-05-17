import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readJSON } from "@/lib/storage";

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

    // 读取用户数据
    const users = readJSON("users.json");

    // 查找用户
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 验证密码（兼容旧版明文密码和新版哈希密码）
    let passwordMatch = false;

    if (user.hash && user.salt) {
      // 新版：使用盐值哈希验证
      const hash = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
        .toString("hex");
      passwordMatch = hash === user.hash;
    } else if (user.password) {
      // 旧版：明文密码比较（兼容已注册的旧用户）
      passwordMatch = password === user.password;
    }

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      msg: "Login successful!",
      user: { email: user.email },
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
