import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const {
    prompt,
    model = "DeepSeek",
    style = "写实",
    shotStrategy = "远景优先",
    characterConsistency = "开启",
    sceneStyle = "写实",
    quality = "普通",
  } = await req.json();

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
  const filePath = path.join(process.cwd(), "..", "data", "records.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const records = JSON.parse(raw);
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
  fs.writeFileSync(filePath, JSON.stringify(records, null, 2));

  return NextResponse.json({ result });
}
