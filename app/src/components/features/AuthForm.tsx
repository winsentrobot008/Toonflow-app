// ============================================================
// Toonflow - Authentication Form Component
// ============================================================

"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export function AuthForm() {
  const { login, register, isLoading, error, clearError } = useAuthStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg("");

    if (isRegister) {
      await register(email, password);
      setSuccessMsg("Registration successful! Please login.");
      setIsRegister(false);
    } else {
      await login(email, password);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    clearError();
    setSuccessMsg("");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-card p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-1">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-400">
            {isRegister
              ? "Sign up to start creating AI short dramas"
              : "Login to continue your creative journey"}
          </p>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-700/30 text-green-300 text-sm">
            {successMsg}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-400 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={cn(
                "w-full px-3 py-2.5 rounded-lg text-sm",
                "bg-gray-800/50 border border-gray-700/50",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50",
                "transition-all duration-200"
              )}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-400 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className={cn(
                "w-full px-3 py-2.5 rounded-lg text-sm",
                "bg-gray-800/50 border border-gray-700/50",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50",
                "transition-all duration-200"
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-semibold",
              "bg-gradient-to-r from-purple-600 to-indigo-600",
              "hover:from-purple-500 hover:to-indigo-500",
              "text-white shadow-lg shadow-purple-500/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
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
                Processing...
              </span>
            ) : isRegister ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
