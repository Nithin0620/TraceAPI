"use client";

import { THEMES, type ThemeName, useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <label className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm text-base-content/70">Theme</span>
        <select className="select select-sm select-bordered bg-base-100" disabled>
          <option>Loading...</option>
        </select>
      </label>
    );
  }

  return (
    <label className="flex items-center gap-2">
      <span className="hidden sm:inline text-sm text-base-content/70">Theme</span>
      <select
        className="select select-sm select-bordered bg-base-100"
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        aria-label="Theme"
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}

