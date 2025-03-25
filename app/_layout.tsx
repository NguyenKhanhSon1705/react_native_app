
import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import GetCurrentUserProvider from "@/providers/GetCurrentUserProvider";
import { Provider } from "react-redux";
import { store } from "@/stores";
export default function Layout() {
  return <>
    <PaperProvider>
      <Provider store={store}>
      <ThemeProvider>
        <GetCurrentUserProvider>
          <LanguageProvider>
            <SafeAreaProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <Toast />
            </SafeAreaProvider>
          </LanguageProvider>
        </GetCurrentUserProvider>
      </ThemeProvider>
      </Provider>
    </PaperProvider>

  </>

}
