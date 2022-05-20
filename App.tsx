import React from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import theme from "./src/global/theme";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { AppRoutes } from "./src/routes/app.routes";

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
      <NavigationContainer>
        <StatusBar style="light" />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
