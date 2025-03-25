import { FC } from "react";
import DropDownButton from "./dropdown";
import { useLanguage } from "@/providers/LanguageContext";
import { COLORS } from "@/themes/ThemeGlobal";
const listlanguages = [
  { label: "English", key: "en" },
  { label: "Tiếng Việt", key: "vi" },
];

const Languages: FC = () => {
  // const [lang , setLang] = useState();
  const { language, setLanguage } = useLanguage()
  return (
    <DropDownButton
      style={{
        borderColor: COLORS.white,
        borderRadius: 10,
        padding: 4,
      }}
      icon={"arrow-down-drop-circle"}
      items={listlanguages}
      defaultValue={language}
      valueCallback={setLanguage} />
  );
};


export default Languages;
