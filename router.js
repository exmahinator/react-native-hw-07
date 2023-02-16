import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import PostsScreen from "./screens/MainScreen/PostsScreen";
import CreatePostsScreen from "./screens/MainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/MainScreen/ProfileScreen";

import { BottomTabIconContainer } from "./ui/routes";

const AuthTab = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
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
    <MainTab.Navigator
      initialRouteName="Пости"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
          paddingHorizontal: 67,
        },
      }}
    >
      <MainTab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer>
                <AntDesign name="appstore-o" size={size} color="#000" />
              </BottomTabIconContainer>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer isFocused>
                <AntDesign name="plus" size={size} color="#fff" />
              </BottomTabIconContainer>
            );
          },
        }}
      />
      <MainTab.Screen
        name="Профіль"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <BottomTabIconContainer>
                <Feather name="user" size={size} color="#000" />
              </BottomTabIconContainer>
            );
          },
        }}
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
