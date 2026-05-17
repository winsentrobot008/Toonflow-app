// ============================================================
// Toonflow - AI Generation Panel Component
// ============================================================

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GenerationResult {
  result: string;
}

export function GenerationPanel() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="glass-card p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-white mb-3">
          Create Your Story
        </h3>

        <form onSubmit={handleGenerate} className="space-y-3">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your story idea... (e.g., A brave astronaut discovers an ancient alien civilization on Mars)"
              rows={3}
              maxLength={2000}
              className={cn(
                "w-full px-3 py-2.5 rounded-lg text-sm resize-none",
                "bg-gray-800/50 border border-gray-700/50",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50",
                "transition-all duration-200"
              )}
            />
            <span className="absolute bottom-2 right-2 text-[10px] text-gray-600">
              {prompt.length}/2000
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500">
              Powered by DeepSeek AI
            </p>
            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-semibold",
                "bg-gradient-to-r from-purple-600 to-indigo-600",
                "hover:from-purple-500 hover:to-indigo-500",
                "text-white shadow-lg shadow-purple-500/20",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="glass-card p-4 sm:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">
              Generated Content
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.result);
              }}
              className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
            {result.result}
          </pre>
        </div>
      )}
    </div>
  );
}
