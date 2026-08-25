import { useCallback, useEffect, useState } from "react";

const THEME_KEY = "cabine_theme";

export function useTheme() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "auto";
    } catch (e) {
      return "auto";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
  }, [mode]);

  const setTheme = useCallback((next) => {
    setMode(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  }, []);

  return { mode, setTheme };
}
