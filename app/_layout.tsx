import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import GetCurrentUserProvider from "@/providers/GetCurrentUserProvider";
import { Provider } from "react-redux";
import { store } from "@/stores";
import React from "react";

export default function _Layout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <ThemeProvider>
            <GetCurrentUserProvider>
              <LanguageProvider>
                <Slot />
                <Toast />
              </LanguageProvider>
            </GetCurrentUserProvider>
          </ThemeProvider>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
