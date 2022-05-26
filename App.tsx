import React from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import "react-native-gesture-handler";

import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import theme from "./src/global/theme";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "./src/hooks/auth";
import { Routes } from "./src/routes";

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
