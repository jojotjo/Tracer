import React, { useEffect, useState } from "react";
import { getTheme, toggleTheme } from "../utils/theme";

export default function ThemeToggle() {
  const [theme, setThemeState] = useState("light");

  // Initialize theme on mount
  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const handleToggle = () => {
    const nextTheme = toggleTheme();
    setThemeState(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded border"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
