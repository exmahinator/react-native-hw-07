import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
  Pressable,
  ImageBackground,
} from "react-native";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.log("Credentials", `${name} + ${password}`);
  };

  const onLinkPress = () => {
    console.log("Sending to registration form...");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      > */}
        {/* <ImageBackground source={require("../../img/backgroundPhoto_opt.jpg")} style={styles.image}> */}
          <View style={styles.container}>
          {/* <ImageBackground source={require("../../img/backgroundPhoto_opt.jpg")} style={styles.image}> */}
            <View style={styles.subContainer}>
              <View style={styles.textContainer}>
                <Text>Войти</Text>
              </View>
              <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={{marginBottom: 16}}>
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Адреса елекронної скриньки"
                  style={styles.input}
                />
              </View>
              <View>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>

              {/* <Button
                  title={"Войти"}
                  style={styles.loginButton}
                  onPress={onLogin}
                /> */}
                </KeyboardAvoidingView>
              <Pressable style={styles.buttonContainer} onPress={onLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
              </Pressable>
              <Pressable onPress={onLinkPress}>
                <Text style={styles.linkText} >Немає акаунта? Зареєструватися</Text>
              </Pressable>
              {/* </KeyboardAvoidingView> */}
            </View>
            {/* </ImageBackground> */}
          </View>
        {/* </ImageBackground> */}
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 320,
    fontSize: 20,
    height: "100%",
    width: "100%"
  },
  subContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: "100%",
    width: "100%"
  },
  textContainer: {
    marginBottom: 33,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
    textAlign: "center",
  },
  buttonContainer: {
    width: 343,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    padding: 16,
    marginTop: 33,
    marginBottom: 16
  },
  buttonText: {
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    color: "#1B4371",
  }
});
