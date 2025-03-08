
import { ThemeProvider } from "@/themes/ThemeContext";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function Layout() {
  return <>
    <PaperProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </SafeAreaProvider>
      </ThemeProvider>
    </PaperProvider>

  </>

}
