// ============================================================
// Toonflow - Main Application Page
// ============================================================

"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";
import { Header } from "@/components/layout/Header";
import { AuthForm } from "@/components/features/AuthForm";
import { GenerationPanel } from "@/components/features/GenerationPanel";
import { HistoryPanel } from "@/components/features/HistoryPanel";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            AI-Powered Short Drama Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Create Stories with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              AI Magic
            </span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm sm:text-base">
            Transform your ideas into compelling animated stories with intelligent
            scriptwriting, shot planning, and character consistency.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="animate-spin h-8 w-8 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
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
              <p className="text-sm text-gray-400">Loading...</p>
            </div>
          </div>
        )}

        {/* Auth Section (when not authenticated) */}
        {!isAuthenticated && !isLoading && (
          <div className="mb-12">
            <AuthForm />
          </div>
        )}

        {/* Main App (when authenticated) */}
        {isAuthenticated && !isLoading && (
          <div className="space-y-10">
            {/* Generation Panel */}
            <section>
              <GenerationPanel />
            </section>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-gray-600 bg-gray-950">
                  HISTORY
                </span>
              </div>
            </div>

            {/* History Panel */}
            <section>
              <HistoryPanel />
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <p className="text-xs text-gray-600">
            Toonflow &copy; {new Date().getFullYear()} &mdash; AI Short Drama Studio
          </p>
        </footer>
      </main>
    </div>
  );
}
