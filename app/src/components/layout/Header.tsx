// ============================================================
// Toonflow - Header Component
// ============================================================

"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="relative z-20 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Toonflow
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">
                AI Short Drama Studio
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user && (
              <>
                <span className="text-xs text-gray-400 hidden sm:block">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-lg",
                    "text-gray-400 hover:text-white",
                    "bg-gray-800/50 hover:bg-gray-700/50",
                    "border border-gray-700/50 hover:border-gray-600/50",
                    "transition-all duration-200"
                  )}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
