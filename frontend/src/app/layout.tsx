import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/context/provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Group Gains",
  description: "Achieve your fitness goals together with Group Gains - the ultimate platform for collaborative workout planning and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          process.env.NODE_ENV === "development" && "debug-screens"
        )}
      >
        <Provider>{children}</Provider>
        <Sonner />
      </body>
    </html>
  );
}
