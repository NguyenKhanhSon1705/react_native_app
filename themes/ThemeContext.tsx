import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { COLORS } from "./ThemeGlobal";
import { Appearance, useColorScheme } from "react-native";

// Định nghĩa kiểu cho Theme
interface Theme {
  background: string;
  text: string;
}

// Định nghĩa kiểu cho Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Khai báo theme sáng và tối
const lightTheme: Theme = {
  background: COLORS.BACKGROUND_LIGHT,
  text: COLORS.TEXT_DARK,
};

const darkTheme: Theme = {
  background: COLORS.BACKGROUND_DARK,
  text: COLORS.TEXT_LIGHT,
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  toggleTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'light' ? lightTheme : darkTheme)
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme trong toàn bộ app
export const useTheme = () => useContext(ThemeContext);
