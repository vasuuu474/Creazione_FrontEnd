import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 p-3 rounded-full bg-[var(--app-input-bg)] border border-[var(--app-input-border)] text-[var(--app-heading)] shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
