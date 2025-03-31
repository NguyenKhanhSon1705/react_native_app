import { SafeAreaView } from "react-native";
import StartApp from "./auth/StartApp";
import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import AreaScreen from "./areas/area";
export default function Page() {

  return (
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LanguageProvider>
          <AreaScreen />
          </LanguageProvider>
        </SafeAreaView>
      </ThemeProvider>
  );
}

