import { SafeAreaView } from "react-native";
import StartApp from "./auth/StartApp";
import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
export default function Page() {

  return (
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LanguageProvider>
          <StartApp />
          </LanguageProvider>
        </SafeAreaView>
      </ThemeProvider>
  );
}

