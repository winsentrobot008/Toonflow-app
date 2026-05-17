// ============================================================
// Toonflow - Toast Notification Component
// ============================================================

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  addToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts = [] }: { toasts?: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-in-right max-w-sm",
            toast.type === "success" &&
              "bg-green-900/90 border border-green-700/50 text-green-200",
            toast.type === "error" &&
              "bg-red-900/90 border border-red-700/50 text-red-200",
            toast.type === "info" &&
              "bg-gray-800/90 border border-gray-700/50 text-gray-200"
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

// Standalone ToastContainer for use without provider
export { ToastContainer };
