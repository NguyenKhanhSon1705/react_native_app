import { SafeAreaView } from "react-native";
import { PaperProvider } from "react-native-paper";
import StartApp from "./auth/StartApp";
import { ThemeProvider } from "@/themes/ThemeContext";
import ChooseShop from "./dashboard/chooseShop";
export default function Page() {

  return (
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StartApp />
        </SafeAreaView>
      </ThemeProvider>
  );
}

