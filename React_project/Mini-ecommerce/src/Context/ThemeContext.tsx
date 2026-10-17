
import { createContext, useState } from "react";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export function ThemeProvider({ children }: IProps) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
