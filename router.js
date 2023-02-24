import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";

import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import HomeScreen from "./screens/MainScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = ({stateChange}) => {
  // console.log("Router stateChange:", stateChange);
  if (!stateChange) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          options={{
            title: "Login screen",
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <AuthStack.Screen
          name="Register"
          options={{ title: "Registration screen", headerShown: false }}
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }

  return <HomeScreen />;
};
