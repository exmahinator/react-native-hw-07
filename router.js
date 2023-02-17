import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  PostsPseudoHeaderContainer,
  PostsPseudoHeaderTitle,
  PostsPseudoHeaderIcon,
} from "./ui/pagesHeaders";

import LoginScreen from "./screens/AuthScreen/LoginScreen";
import RegistrationScreen from "./screens/AuthScreen/RegistrationScreen";

import PostsScreen from "./screens/MainScreen/PostsScreen";
import CreatePostsScreen from "./screens/MainScreen/CreatePostsScreen";
import ProfileScreen from "./screens/MainScreen/ProfileScreen";

import { BottomTabIconContainer } from "./ui/routes";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function MainScreenPseudoHeader() {
  return (
    <PostsPseudoHeaderContainer isPostsScreen>
      <PostsPseudoHeaderTitle>Публікації</PostsPseudoHeaderTitle>
    </PostsPseudoHeaderContainer>
  );
}

function AddPostsScreenPseudoHeader() {
  return (
    <PostsPseudoHeaderContainer>
      <PostsPseudoHeaderTitle>Створити публікацію</PostsPseudoHeaderTitle>
    </PostsPseudoHeaderContainer>
  );
}

export const useRoute = (props) => {
  console.log(props);

  function LogIn() {
    console.log("Logging in");
    props.authHandler();
  }

  function LogOut() {
    console.log("Logging out");
    props.authHandler();
  }

  if (!props.isAuthorized) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Login"
          options={{
            title: "Login screen",
            headerShown: false,
          }}
          component={LoginScreen}
          initialParams={{LogIn: LogIn}}
        />
        <AuthStack.Screen
          name="Register"
          options={{ title: "Registration screen", headerShown: false }}
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
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
          headerRight: () => (
            <PostsPseudoHeaderIcon isPostsScreen onPress={LogOut}>
              <Feather name="log-out" size={24} color="black" />
            </PostsPseudoHeaderIcon>
          ),
          headerTitleStyle: {
            textAlign: "center",
          },
          headerTitle: (props) => <MainScreenPseudoHeader {...props} />
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
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <PostsPseudoHeaderIcon isNotPostsScreen>
              <AntDesign name="arrowleft" size={24} color="black" />
            </PostsPseudoHeaderIcon>
          ),
          headerTitle: (props) => <AddPostsScreenPseudoHeader {...props} />
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
