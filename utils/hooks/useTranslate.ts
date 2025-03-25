import translations from "@/languages/translations";
import { useLanguage } from "../../providers/LanguageContext";

export const useTranslate = () => {
    const { language } = useLanguage(); 

    return (key: string) => {
      return translations[key]?.[language] || translations[key]?.["en"] || key;
    };
  };