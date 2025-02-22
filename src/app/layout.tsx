"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle").then((mod) => mod.ThemeToggle), {
  ssr: false,
  loading: () => <div className="w-10 h-10 rounded-md bg-muted animate-pulse" />
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
