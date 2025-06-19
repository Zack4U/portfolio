import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textAlt: string;
  textLight: string;
  textDark: string;
  border: string;
  glass: string;
  glassBorder: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const lightColors: ThemeColors = {
  primary: "rgb(255, 1, 1)", // Crimson
  primaryHover: "rgb(255, 10, 50)",
  primaryLight: "rgb(255, 10, 10)",
  primaryDark: "rgb(160, 0, 35)",
  background: "rgb(255, 255, 255)",
  backgroundAlt: "rgb(220, 220, 220)",
  text: "rgb(33, 33, 33)",
  textAlt: "rgb(102, 102, 102)",
  textLight: "rgb(255, 255, 255)",
  textDark: "rgb(33, 33, 33)",
  border: "rgb(229, 231, 235)",
  glass: "rgba(255, 255, 255, 0.6)",
  glassBorder: "rgba(229, 231, 235, 0.25)",
};

const darkColors: ThemeColors = {
  primary: "rgb(255, 1, 1)", // Crimson
  primaryHover: "rgb(255, 10, 50)",
  primaryLight: "rgb(255, 10, 10)",
  primaryDark: "rgb(160, 0, 35)",
  background: "rgb(10, 10, 10)",
  backgroundAlt: "rgb(24, 24, 24)",
  text: "rgb(255, 255, 255)",
  textAlt: "rgb(180, 180, 180)",
  textLight: "rgb(255, 255, 255)",
  textDark: "rgb(33, 33, 33)",
  border: "rgb(45, 45, 45)",
  glass: "rgba(10, 10, 10, 0.6)",
  glassBorder: "rgba(45, 45, 45, 0.25)",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      (savedTheme as Theme) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const colors = theme === "dark" ? darkColors : lightColors;

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update CSS variables
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [theme, colors]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
