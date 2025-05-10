import { SafeAreaView } from "react-native";
import StartApp from "./auth/StartApp";
import { ThemeProvider } from "@/themes/ThemeContext";
import { LanguageProvider } from "@/providers/LanguageContext";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import accessToken from "@/utils/functions/accessToken";
import routes_path from "@/routes/routes_path";
import React from "react";

export default function Page() {
  // const rootNavigation = useRootNavigationState();

  // useEffect(() => {
  //     if (!rootNavigation?.key) return; // Chưa sẵn sàng

  //     if (accessToken.getAccessToken()) {
  //         router.push(routes_path.TABLEAREA);
  //     }
  // }, [rootNavigation]);
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

