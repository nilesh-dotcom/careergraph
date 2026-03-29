import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "CareerGraph.ai — Data-Backed Career Strategy for Tech Professionals",
  description:
    "Get a personalized, data-backed career assessment in 20 minutes. Understand your market position, discover career paths, and get an actionable 90-day plan.",
  keywords: [
    "career assessment",
    "tech career",
    "salary benchmark",
    "skill gap analysis",
    "career path",
    "Indian IT professionals",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
