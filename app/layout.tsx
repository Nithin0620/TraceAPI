import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeContext";
import { ThemeInitScript } from "./components/ThemeInitScript";

export const metadata: Metadata = {
  title: "TraceAPI — Minimal API Tester",
  description: "Beginner-friendly API testing with AI-guided explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeInitScript />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
