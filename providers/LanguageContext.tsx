import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import languagesCookies from "../utils/functions/languageCookies";

// Khởi tạo Context
const LanguageContext = createContext({
  language: "en",
  setLanguage: (lang: string) => {},
});

// Provider để bọc toàn bộ app
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await languagesCookies.getLanguageCookie();
      setLanguage(storedLang || "en");
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    setLanguage(lang);
    await languagesCookies.setLanguageCookie(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook để sử dụng ngôn ngữ
export const useLanguage = () => useContext(LanguageContext);
