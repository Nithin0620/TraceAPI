export function ThemeInitScript() {
  const code = `
(function() {
  try {
    var saved = localStorage.getItem("traceapi.theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  } catch (_) {}
})();`.trim();

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

