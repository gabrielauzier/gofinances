import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../hooks/auth";
import * as SplashScreen from "expo-splash-screen";

export function Routes() {
  SplashScreen.preventAutoHideAsync();
  const { user, isUserStorageLoading } = useAuth();

  if (isUserStorageLoading) return null;
  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
