import { SafeAreaView } from "react-native";
import StartApp from "./auth/StartApp";
import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import AreaScreen from "./areas/area";
import TableScreen from "./tables/table";
export default function Page() {

  return (
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LanguageProvider>
          <TableScreen />
          </LanguageProvider>
        </SafeAreaView>
      </ThemeProvider>
  );
}

