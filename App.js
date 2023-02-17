import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isAuthorized, setIsAuthorized] = useState(false)

  // const logIn = () => {
  //   // setIsAuthorized(!isAuthorized);
  //   console.log("clicking");
  //   setIsAuthorized(true);
  // }

  // const logOut = () => {
  //   // setIsAuthorized(!isAuthorized);
  //   console.log("clicking");
  //   setIsAuthorized(false);
  // }

  const authHandler = () => {
    setIsAuthorized(!isAuthorized)
  }

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  onLayoutRootView();

  const routing = useRoute({isAuthorized, authHandler});

  return <NavigationContainer>{routing}</NavigationContainer>;
}
