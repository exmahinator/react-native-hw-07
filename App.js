import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { onAuthUserStateChanged } from "firebase/auth";

import { useRoute } from "./router";
import { store } from "./redux/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null)

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    // if (user) {
    //   // User is signed in, see docs for a list of available properties
    //   // https://firebase.google.com/docs/reference/js/firebase.User
    //   console.log("Current user:", user);
    //   await setUser(user)
    //   // ...
    // } else {
    //   console.log("Some error");
    // }
    await setUser(user)
  });

  // const dispatch = useDispatch();

  // dispatch(onAuthUserStateChanged())

  const authHandler = () => {
    setIsAuthorized(!isAuthorized);
  };

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

  const routing = useRoute({user});

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
