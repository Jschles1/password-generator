import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          jbm.className,
          "bg-gradient-to-b from-[#14131B] to-[#08070B]"
        )}
      >
        {children}
      </body>
    </html>
  );
}
