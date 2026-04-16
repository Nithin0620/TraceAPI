"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "traceapi.theme";

export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "garden",
  "forest",
  "aqua",
  "pastel",
  "wireframe",
  "black",
  "luxury",
  "dracula",
] as const;

export type ThemeName = (typeof THEMES)[number];

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeName) {
  document.documentElement.setAttribute("data-theme", theme);
  const darkThemes = ["dark", "synthwave", "cyberpunk", "dracula", "forest", "black", "luxury"];
  document.documentElement.style.colorScheme = darkThemes.includes(theme) ? "dark" : "light";
}

function loadInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (saved && (THEMES as readonly string[]).includes(saved)) return saved;
  } catch {
    // ignore
  }
  // Fallback to system preference if available
  if (typeof window !== "undefined" && window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = loadInitialTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) applyTheme(theme);
  }, [theme, mounted]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (t) => {
        setThemeState(t);
        try {
          localStorage.setItem(STORAGE_KEY, t);
        } catch {
          // ignore
        }
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

