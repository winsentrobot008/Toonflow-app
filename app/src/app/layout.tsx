import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toonflow - AI Short Drama Studio",
  description:
    "Toonflow is an AI-powered short drama creation platform. Transform your ideas into compelling animated stories with intelligent scriptwriting, shot planning, and character consistency.",
  keywords: [
    "AI short drama",
    "animation",
    "storytelling",
    "AI generation",
    "video creation",
    "Toonflow",
    "Toonood",
  ],
  authors: [{ name: "Toonflow Team" }],
  openGraph: {
    title: "Toonflow - AI Short Drama Studio",
    description:
      "Transform your ideas into compelling animated stories with AI-powered creation tools.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toonflow - AI Short Drama Studio",
    description:
      "Transform your ideas into compelling animated stories with AI-powered creation tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-gray-950`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
