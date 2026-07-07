(() => {
  "use strict";
  try {
    const root = document.documentElement;
    if (root.hasAttribute("data-force-light")) {
      root.setAttribute("data-theme", "light");
      return;
    }

    const stored = localStorage.getItem("theme");
    const theme = stored === "light" || stored === "dark" ? stored : null;
    if (theme) root.setAttribute("data-theme", theme);
  } catch {
    // ignore
  }
})();
