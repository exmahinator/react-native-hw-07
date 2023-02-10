import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import LoginScreen from "./screens/LoginScreen/loginScreen";
import RegistrationScreen from "./screens/RegistrationScreen/registrationScreen";

const MainStack = createStackNavigator();

export default function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const toggleScreen = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <>
      {/* <View style={styles.container}>
        <StatusBar style="auto" />

        <ImageBackground
          source={require("./assets/img/backgroundPhoto_opt.jpg")}
          style={styles.image}
        >
          {isLoginPage && <LoginScreen switchScreen={toggleScreen} />}
          {!isLoginPage && <RegistrationScreen switchScreen={toggleScreen} />}
        </ImageBackground>
      </View> */}

      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Login"
            options={{
              title: "Login screen",
              headerShown: false,
            }}
            component={LoginScreen}
          />
          <MainStack.Screen
            name="Register"
            options={{ title: "Register screen", headerShown: false }}
            component={RegistrationScreen}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
