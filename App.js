import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import PostsScreen from "./screens/MainScreen/PostsScreen";
import CreatePostsScreen from "./screens/MainScreen/CreatePostsScreen";
import CommentsScreen from "./screens/MainScreen/CommentsScreen";
import ProfileScreen from "./screens/MainScreen/ProfileScreen";

SplashScreen.preventAutoHideAsync();

const AuthTab = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthTab.Navigator initialRouteName="Login">
        <AuthTab.Screen
          name="Login"
          options={{
            title: "Login screen",
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <AuthTab.Screen
          name="Register"
          options={{ title: "Registration screen", headerShown: false }}
          component={RegistrationScreen}
        />
      </AuthTab.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" component={PostsScreen} />
      <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
      <MainTab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

export default function App() {
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

  const routing = useRoute(null);

  return (
    <NavigationContainer>
      {/* ---------------------------------------------AUTH------------------------------------------- */}
      {/* <AuthTab.Navigator initialRouteName="Login">
        <AuthTab.Screen
          name="Login"
          options={{
            title: "Login screen",
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <AuthTab.Screen
          name="Register"
          options={{ title: "Registration screen", headerShown: false }}
          component={RegistrationScreen}
        />
      </AuthTab.Navigator> */}
      {/* --------------------------------------------------------------------------------------------- */}

      {routing}

      {/* ---------------------------------------------BOTTOM TAB------------------------------------------- */}
      {/* <MainTab.Navigator>
        <MainTab.Screen name="Posts" component={PostsScreen} />
        <MainTab.Screen name="CreatePosts" component={CreatePostsScreen} />
        <MainTab.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
      </MainTab.Navigator> */}
      {/* --------------------------------------------------------------------------------------------- */}
    </NavigationContainer>
  );
}
