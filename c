import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const {
      prompt,
      model = "DeepSeek",
      style = "写实",
      shotStrategy = "远景优先",
      characterConsistency = "开启",
      sceneStyle = "写实",
      quality = "普通",
    } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Log the AI optimization options for future use
    console.log("AI Generation Options:", {
      model,
      style,
      shotStrategy,
      characterConsistency,
      sceneStyle,
      quality,
    });

    // Mock AI generation result (replace with DeepSeek API call when ready)
    const result = `[AI 生成结果] 基于输入"${prompt}"的生成内容。
  - 模型: ${model}
  - 风格: ${style}
  - 分镜策略: ${shotStrategy}
  - 角色一致性: ${characterConsistency}
  - 场景风格: ${sceneStyle}
  - 输出质量: ${quality}`;

    // Save to records with all options
    const records = readJSON("records.json");
    records.push({
      prompt,
      result,
      model,
      style,
      shotStrategy,
      characterConsistency,
      sceneStyle,
      quality,
      createdAt: new Date().toISOString(),
    });
    writeJSON("records.json", records);

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
