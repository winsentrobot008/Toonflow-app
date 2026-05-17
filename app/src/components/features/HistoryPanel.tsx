// ============================================================
// Toonflow - History Panel Component
// ============================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Record {
  prompt: string;
  result: string;
  model: string;
  style: string;
  createdAt: string;
}

export function HistoryPanel() {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/history");
      if (!res.ok) throw new Error("Failed to load history");
      const data = await res.json();
      setRecords(data.records || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center py-8">
          <svg
            className="animate-spin h-5 w-5 text-purple-500"
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
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6">
        <div className="text-center py-8">
          <p className="text-sm text-red-400 mb-2">{error}</p>
          <button
            onClick={fetchHistory}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="text-center py-8">
          <svg
            className="w-10 h-10 text-gray-700 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="text-sm text-gray-500">No generation history yet</p>
          <p className="text-xs text-gray-600 mt-1">
            Your created stories will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {records.map((record, index) => (
        <div
          key={index}
          className={cn(
            "glass-card overflow-hidden transition-all duration-200",
            expandedIndex === index ? "ring-1 ring-purple-500/20" : ""
          )}
        >
          {/* Summary */}
          <button
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
            className="w-full flex items-center justify-between p-3 sm:p-4 text-left"
          >
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-sm text-white truncate">
                {record.prompt}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-500">
                  {formatDate(record.createdAt)}
                </span>
                <span className="text-[10px] text-gray-600">·</span>
                <span className="text-[10px] text-purple-400/70">
                  {record.style || "Default"}
                </span>
              </div>
            </div>
            <svg
              className={cn(
                "w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0",
                expandedIndex === index ? "rotate-180" : ""
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Expanded Content */}
          {expandedIndex === index && (
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 animate-fade-in">
              <div className="border-t border-gray-800 pt-3">
                <pre className="text-xs text-gray-400 whitespace-pre-wrap font-sans leading-relaxed max-h-60 overflow-y-auto">
                  {record.result}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
