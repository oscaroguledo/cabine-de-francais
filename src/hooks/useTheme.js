import { useCallback, useEffect, useState } from "react";
import { getDb, getSetting, setSetting } from "../db/sqlite";

const THEME_KEY = "cabine_theme";   // a copy kept in the browser, so the first paint already has the right theme
const VALID = ["auto", "light", "dark"];

function cached() {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return VALID.includes(v) ? v : "auto";
  } catch (e) {
    return "auto";
  }
}

/** The theme lives in the database (the source of truth); the browser copy only avoids a flash on load. */
export function useTheme() {
  const [mode, setMode] = useState(cached);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
  }, [mode]);

  // When the database opens, use the theme saved there (it may have been chosen on another browser of this device's data).
  useEffect(() => {
    let cancelled = false;
    getDb()
      .then((db) => {
        const saved = getSetting(db, "theme");
        if (!cancelled && VALID.includes(saved)) setMode(saved);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const setTheme = useCallback((next) => {
    setMode(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    getDb()
      .then((db) => setSetting(db, "theme", next))
      .catch((e) => console.error("Could not save theme", e));
  }, []);

  return { mode, setTheme };
}
