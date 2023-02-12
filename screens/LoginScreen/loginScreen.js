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
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const initialState = { email: "", password: "" };

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const emailHandler = (value) => setState((prevState) => ({...prevState, email: value}));
  const passwordHandler = (value) => setState((prevState) => ({...prevState, password: value}));

  const onInputFocus = (event) => {
    setKeyboardIsShown(true);
    const nativeTag = event.target._nativeTag;
    switch (nativeTag) {
      case 189:
        setIsEmailInFocus(true);
        break;
      case 195:
        setIsPasswordInFocus(true);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onInputBlur = (event) => {
    const nativeTag = event.target._nativeTag;
    switch (nativeTag) {
      case 189:
        setIsEmailInFocus(false);
        break;
      case 195:
        setIsPasswordInFocus(false);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onScreenPress = () => {
    Keyboard.dismiss();
    setKeyboardIsShown(false);
  };

  const onLogin = () => {
    console.log("Credentials:", state);
    setState(initialState)
  };

  const onLinkPress = () => {
    console.log("Sending to registration form...");
    navigation.navigate("Register")
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/img/backgroundPhoto_opt.jpg")}
          style={styles.image}
        >
          <View style={styles.signInContainer}>
            <View
              style={{
                ...styles.subContainer,
                marginBottom: keyboardIsShown ? 50 : 0,
              }}
            >
              <View style={styles.textContainer}>
                <Text style={styles.introText}>Увійти</Text>
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : ""}
              >
                <View>
                  <TextInput
                    value={state.email}
                    onChangeText={emailHandler}
                    placeholder="Адреса елекронної скриньки"
                    style={{
                      ...styles.input,
                      borderColor: isEmailInFocus ? "#FF6C00" : "#fff",
                      backgroundColor: isEmailInFocus ? "#fff" : "#F6F6F6",
                      color: isEmailInFocus ? "#000" : "#bdbdbd",
                    }}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                  />
                </View>
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    value={state.password}
                    onChangeText={passwordHandler}
                    placeholder="Пароль"
                    secureTextEntry={true}
                    style={{
                      ...styles.input,
                      borderColor: isPasswordInFocus ? "#FF6C00" : "#fff",
                      backgroundColor: isPasswordInFocus ? "#fff" : "#F6F6F6",
                      color: isPasswordInFocus ? "#000" : "#bdbdbd",
                    }}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                  />
                </View>
              </KeyboardAvoidingView>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onLogin}
                activeOpacity={0.5}
              >
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLinkPress} activeOpacity={0.5}>
                <Text style={styles.linkText}>
                  Немає акаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  signInContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 320,
    // paddingTop: 200,
    fontSize: 20,
    height: "100%",
    width: "100%",
  },
  subContainer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: "100%",
    width: "100%",
  },
  textContainer: {
    marginBottom: 32,
  },
  introText: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  input: {
    fontFamily: "Roboto-Regular",
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "#f6f6f6",
    borderColor: "#fff",
    color: "#bdbdbd",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonContainer: {
    width: 343,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 19,
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
});
