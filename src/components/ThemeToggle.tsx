"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasLight = document.documentElement.classList.contains("light");
    setIsLight(hasLight);
  }, []);

  const toggleTheme = () => {
    const nextState = !isLight;
    setIsLight(nextState);
    if (nextState) {
      document.documentElement.classList.add("light");
      localStorage.setItem("ks_theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("ks_theme", "dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className="w-9 h-9 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-center text-muted hover:text-foreground hover:border-brand-blue transition-colors"
    >
      {isLight ? <Moon className="w-4 h-4 text-violet-600" /> : <Sun className="w-4 h-4 text-brand-blue" />}
    </button>
  );
}
