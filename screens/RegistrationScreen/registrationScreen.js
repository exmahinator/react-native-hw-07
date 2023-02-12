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

const initialState = { avatar: "", name: "", email: "", password: "" };

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState)
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const [isNameInFocus, setIsNameInFocus] = useState(false);
  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const avatarHandler = () => setState((prevState) => ({...prevState, avatar: "Some avatar url"}));
  const nameHandler = (value) => setState((prevState) => ({...prevState, name: value}));
  const emailHandler = (value) => setState((prevState) => ({...prevState, email: value}));
  const passwordHandler = (value) => setState((prevState) => ({...prevState, password: value}));

  const onInputFocus = (event) => {
    setKeyboardIsShown(true);
    const nativeTag = event.target._nativeTag;
    switch (nativeTag) {
      case 117:
        setIsNameInFocus(true);
        break;
      case 123:
        setIsEmailInFocus(true);
        break;
      case 127:
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
      case 117:
        setIsNameInFocus(false);
        break;
      case 123:
        setIsEmailInFocus(false);
        break;
      case 127:
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

  const onRegister = () => {
    console.log("Register data:", state);
    setState(initialState);
    console.log("Initial state:", initialState);
    console.log("State after sending:", state);
  };

  const onLinkPress = () => {
    console.log("Sending to login form...");
    navigation.navigate("Login");
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
                marginBottom: keyboardIsShown ? 180 : 0,
              }}
            >
              <TouchableOpacity
                onPress={avatarHandler}
                style={styles.avatarContainer}
                activeOpacity={0.5}
              >
                <View style={styles.avatarAddPlaceholder}></View>
                <ImageBackground
                  source={require("../../assets/img/add_opt.png")}
                  resizeMode="cover"
                  style={styles.avatarAddIcon}
                ></ImageBackground>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.introText}>Реєстрація</Text>
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : ""}
              >
                <View>
                  <TextInput
                    value={state.name}
                    onChangeText={nameHandler}
                    placeholder="Ваше ім'я"
                    style={{
                      ...styles.input,
                      borderColor: isNameInFocus ? "#FF6C00" : "#fff",
                      backgroundColor: isNameInFocus ? "#fff" : "#F6F6F6",
                      color: isNameInFocus ? "#000" : "#bdbdbd",
                    }}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                  />
                </View>
                <View style={{ marginTop: 16 }}>
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
                onPress={onRegister}
                activeOpacity={0.5}
              >
                <Text style={styles.buttonText}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLinkPress} activeOpacity={0.5}>
                <Text style={styles.linkText}>Уже є акаунт? Увійти</Text>
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
    paddingTop: 263,
    // paddingTop: 150,
    fontSize: 20,
    height: "100%",
    width: "100%",
  },
  subContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    height: "100%",
    width: "100%",
  },
  avatarContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: -60,
    left: 128,
  },
  avatarAddPlaceholder: {
    backgroundColor: "#F6F6F6",
    width: 132,
    height: 120,
    borderRadius: 16,
  },
  avatarAddIcon: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -12,
    bottom: 14,
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
