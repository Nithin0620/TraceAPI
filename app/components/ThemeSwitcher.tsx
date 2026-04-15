"use client";

import { THEMES, type ThemeName, useTheme } from "./ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

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
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

