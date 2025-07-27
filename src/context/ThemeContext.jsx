import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  // Get theme from cookies or default to dark
  const [theme, setTheme] = useState(() => {
    return Cookies.get("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
