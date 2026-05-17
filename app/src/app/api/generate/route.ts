// ============================================================
// Toonflow - AI Generation API Route
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/storage";

interface GenerateRequest {
  prompt: string;
  model?: string;
  style?: string;
  shotStrategy?: string;
  characterConsistency?: string;
  sceneStyle?: string;
  quality?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const {
      prompt,
      model = "DeepSeek",
      style = "写实",
      shotStrategy = "远景优先",
      characterConsistency = "开启",
      sceneStyle = "写实",
      quality = "普通",
    } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    if (prompt.length > 2000) {
      return NextResponse.json(
        { error: "Prompt must be less than 2000 characters" },
        { status: 400 }
      );
    }

    // Log the AI optimization options for future use
    console.log("[Toonflow] AI Generation Request:", {
      prompt: prompt.slice(0, 100),
      model,
      style,
      shotStrategy,
      characterConsistency,
      sceneStyle,
      quality,
    });

    // Try DeepSeek API if key is configured
    let result: string;
    const deepseekApiKey = process.env.DEEPSEEK_API_KEY;

    if (deepseekApiKey) {
      try {
        const deepseekResponse = await fetch(
          "https://api.deepseek.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${deepseekApiKey}`,
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [
                {
                  role: "system",
                  content: `You are an AI short drama scriptwriter. Generate creative content based on the user's prompt.
Style: ${style}
Shot Strategy: ${shotStrategy}
Character Consistency: ${characterConsistency}
Scene Style: ${sceneStyle}
Quality: ${quality}`,
                },
                {
                  role: "user",
                  content: prompt,
                },
              ],
              max_tokens: 1000,
              temperature: 0.8,
            }),
          }
        );

        if (!deepseekResponse.ok) {
          throw new Error(`DeepSeek API error: ${deepseekResponse.status}`);
        }

        const deepseekData = await deepseekResponse.json();
        result =
          deepseekData.choices?.[0]?.message?.content ||
          "[AI Generated] No content returned";
      } catch (apiError) {
        console.error("[Toonflow] DeepSeek API error:", apiError);
        result = generateMockResult(prompt, model, style, shotStrategy, characterConsistency, sceneStyle, quality);
      }
    } else {
      // Mock AI generation result (fallback)
      result = generateMockResult(prompt, model, style, shotStrategy, characterConsistency, sceneStyle, quality);
    }

    // Save to records
    try {
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
    } catch (storageError) {
      console.error("[Toonflow] Storage error:", storageError);
      // Non-critical: continue even if storage fails
    }

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error("[Toonflow] Generate error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function generateMockResult(
  prompt: string,
  model: string,
  style: string,
  shotStrategy: string,
  characterConsistency: string,
  sceneStyle: string,
  quality: string
): string {
  return `[AI Generated Content]
Based on your prompt: "${prompt}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scene 1: Opening Shot
[${shotStrategy}] A captivating opening that draws the audience into the world.
Style: ${style} | Scene: ${sceneStyle}

Scene 2: Character Introduction
[Character Consistency: ${characterConsistency}]
The main character emerges, setting the stage for the narrative.

Scene 3: Conflict Development
The story builds tension through carefully crafted sequences.

Scene 4: Climax
[Quality: ${quality}] The peak emotional moment arrives.

Scene 5: Resolution
A satisfying conclusion that ties the narrative together.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generation Parameters:
• Model: ${model}
• Style: ${style}
• Shot Strategy: ${shotStrategy}
• Character Consistency: ${characterConsistency}
• Scene Style: ${sceneStyle}
• Quality: ${quality}

[Note: This is a mock result. Configure DEEPSEEK_API_KEY for real AI generation.]`;
}
