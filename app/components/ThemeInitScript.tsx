export function ThemeInitScript() {
  const code = `
(function() {
  try {
    const el = document.documentElement;
    const saved = localStorage.getItem("traceapi.theme");
    const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    el.setAttribute("data-theme", theme);
    el.style.colorScheme = theme === "dark" || theme === "synthwave" || theme === "cyberpunk" || theme === "dracula" || theme === "forest" || theme === "black" || theme === "luxury" ? "dark" : "light";
  } catch (_) {}
})();`.trim();

  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: code }} />;
}

