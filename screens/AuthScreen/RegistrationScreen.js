import React, { useState } from "react";
import {
  Dimensions,
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

import {
  AuthContainer,
  AuthBackground,
  AuthAvatarBtn,
  AuthAvatarBackground,
  AuthSubContainer,
  AuthTextContainer,
  AuthPageText,
  AuthInputContainer,
  AuthInput,
  AuthNavBtn,
  AuthNavText,
  AuthNavLink,  
} from "../../ui/auth";

import addAvatar from "../../assets/img/add_opt.png"
import removeAvatar from "../../assets/img/remove_opt.png"

const initialState = { avatar: "NO", name: "", email: "", password: "" };

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [avatarIsAdded, setAvatarIsAdded] = useState(false);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const [isNameInFocus, setIsNameInFocus] = useState(false);
  const [isEmailInFocus, setIsEmailInFocus] = useState(false);
  const [isPasswordInFocus, setIsPasswordInFocus] = useState(false);

  const avatarHandler = () => {
    // console.log(avatarIsAdded);
    // console.log(state.avatar);
    if (!avatarIsAdded) {
      setState((prevState) => ({ ...prevState, avatar: `YES` }));
      setAvatarIsAdded(!avatarIsAdded);
      return;
    }
    setState((prevState) => ({ ...prevState, avatar: `NO` }));
    setAvatarIsAdded(!avatarIsAdded);
    return;
  };

  const nameHandler = (value) =>
    setState((prevState) => ({ ...prevState, name: value }));
  const emailHandler = (value) =>
    setState((prevState) => ({ ...prevState, email: value }));
  const passwordHandler = (value) =>
    setState((prevState) => ({ ...prevState, password: value }));

  const onInputFocus = (name) => {
    setKeyboardIsShown(true);
    switch (name) {
      case "name":
        setIsNameInFocus(true);
        break;
      case "email":
        setIsEmailInFocus(true);
        break;
      case "password":
        setIsPasswordInFocus(true);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onInputBlur = (name) => {
    switch (name) {
      case "name":
        setIsNameInFocus(false);
        break;
      case "email":
        setIsEmailInFocus(false);
        break;
      case "password":
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
      <AuthContainer>
        <AuthBackground
          source={require("../../assets/img/backgroundPhoto_opt.jpg")}
          keyboardIsShown={keyboardIsShown}
        >
          <AuthSubContainer>
            <AuthAvatarBtn
              onPress={() => avatarHandler()}
              activeOpacity={0.5}
            >
              <AuthAvatarBackground></AuthAvatarBackground>
              <ImageBackground
                source={avatarIsAdded ? removeAvatar : addAvatar}
                resizeMode="cover"
                style={styles.avatarAddIcon}
              ></ImageBackground>
            </AuthAvatarBtn>
            <AuthTextContainer>
              <AuthPageText>Реєстрація</AuthPageText>
            </AuthTextContainer>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : ""}
            >
              <AuthInputContainer screenWidth={calculatedScreenWidth}>
                <AuthInput
                  value={state.name}
                  onChangeText={nameHandler}
                  placeholder="Ваше ім'я"
                  onFocus={() => onInputFocus("name")}
                  onBlur={() => onInputBlur("name")}
                  isInFocus={isNameInFocus}
                />
              </AuthInputContainer>
              <AuthInputContainer screenWidth={calculatedScreenWidth}>
                <AuthInput
                  value={state.email}
                  onChangeText={emailHandler}
                  placeholder="Адреса елекронної скриньки"
                  onFocus={() => onInputFocus("email")}
                  onBlur={() => onInputBlur("email")}
                  isInFocus={isEmailInFocus}
                />
              </AuthInputContainer>
              <AuthInputContainer
                screenWidth={calculatedScreenWidth}
                extraMargin
              >
                <AuthInput
                  value={state.password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onFocus={() => onInputFocus("password")}
                  onBlur={() => onInputBlur("password")}
                  isInFocus={isPasswordInFocus}
                />
              </AuthInputContainer>
            </KeyboardAvoidingView>
            <AuthNavBtn
              onPress={onRegister}
              activeOpacity={0.5}
              screenWidth={calculatedScreenWidth}
            >
              <AuthNavText>Зареєструватися</AuthNavText>
            </AuthNavBtn>
            <AuthNavLink onPress={onLinkPress} activeOpacity={0.5}>
              <AuthNavText link>Уже є акаунт? Увійти</AuthNavText>
            </AuthNavLink>
          </AuthSubContainer>
        </AuthBackground>
      </AuthContainer>
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
