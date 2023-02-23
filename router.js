import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";

import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import HomeScreen from "./screens/MainScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (props) => {

  // console.log("Props:", props.user.email);
  console.log("Props:", props);

  const {user} = props;

  function LogIn() {
    console.log("Logging in");
    props.authHandler();
  }

  function LogOut() {
    console.log("Logging out");
    props.authHandler();
  }

  if (!user) {
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

  return <HomeScreen user={user}/>;
};
