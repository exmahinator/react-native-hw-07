import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as Location from "expo-location";

import db from "../../friebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import noImgPlaceholder from "../../assets/img/postsScreenPlaceholderNoImage_opt.png";
import withImgPlaceholder from "../../assets/img/postsScreenPlaceholderWithImage_opt.png";

import {
  PostsContainer,
  CreatePostsImgContainer,
  CreatePostsImgIcon,
  CreatePostsInfo,
  CreatePostsInputContainer,
  CreatePostsInput,
  CreatePostsRemoveIconContainer,
  CreatePostsSubmitBtn,
  CreatePostsSubmitText,
  CreatePostsLocationIconContainer,
  CreatePostsDetailsContainer,
  CreatePostsImgSubContainer,
  CreatePostsCameraView,
  CreatePostsSnapBtn,
  CreatePostsSnapPreview,
  CreatePostsSnapPreviewContainer,
} from "../../ui/main";

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

const initialState = {
  uri: "",
  comment: "",
  location: "",
  latitude: "",
  longitude: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photoData, setPhotoData] = useState(initialState);
  const [imgIsAdded, setImgIsAdded] = useState(false);
  const [isCommentInFocus, setIsCommentInFocus] = useState(false);
  const [isLocationInFocus, setIsLocationInFocus] = useState(false);
  const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  const { userId, nickname } = useSelector((state) => {
    // console.log(state.auth);
    return state.auth;
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    if (photoData.uri && photoData.comment && photoData.location) {
      setSubmitIsDisabled(false);
    }
  });

  const takePhoto = async () => {
    setImgIsAdded(true);
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    setPhotoData((prevState) => ({
      ...prevState,
      uri: photo.uri,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
  };

  const commentHandler = (value) =>
    setPhotoData((prevState) => ({ ...prevState, comment: value }));
  const locationHandler = (value) =>
    setPhotoData((prevState) => ({ ...prevState, location: value }));

  const onInputFocus = (name) => {
    setKeyboardIsShown(true);
    switch (name) {
      case "comment":
        setIsCommentInFocus(true);
        break;
      case "location":
        setIsLocationInFocus(true);
        break;
      default:
        alert("Something went wrong...");
        return;
    }
  };

  const onInputBlur = (name) => {
    switch (name) {
      case "comment":
        setIsCommentInFocus(false);
        break;
      case "location":
        setIsLocationInFocus(false);
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

  const removeData = () => {
    setPhotoData(initialState);
    setSubmitIsDisabled(true);
    setImgIsAdded(false);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photoData.uri);
    console.log("Response at CreatePosts:", response);
    const file = await response.blob();
    console.log("File at CreatePosts after response:", file);

    const uniquePostID = Date.now().toString();

    const storage = await getStorage();
    const resultRef = await ref(storage, `images/${uniquePostID}`);
    await uploadBytes(resultRef, file);

    const photoDownloadURL = await getDownloadURL(
      ref(storage, `images/${uniquePostID}`)
    );
    console.log("Result photo:", photoDownloadURL);

    return photoDownloadURL;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const { comment, location, latitude, longitude } = photoData;
    const createPosts = await addDoc(collection(db, "posts"), {
      photo,
      comment,
      location,
      latitude,
      longitude,
      userId,
      nickname,
    });
    console.log("Created post:", createPosts);
  };

  const onSubmit = () => {
    // console.log("Photo data:", photoData);
    uploadPostToServer();

    navigation.navigate("Публікації", { photoData });
    setPhotoData(initialState);
    setSubmitIsDisabled(true);
    setImgIsAdded(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <PostsContainer keyboardIsShown={keyboardIsShown}>
        <CreatePostsImgContainer>
          <CreatePostsImgSubContainer>
            <CreatePostsCameraView ref={setCamera}></CreatePostsCameraView>
          </CreatePostsImgSubContainer>
          {photoData.uri !== "" && (
            <CreatePostsSnapPreviewContainer>
              <CreatePostsSnapPreview
                source={{ uri: photoData.uri }}
              ></CreatePostsSnapPreview>
            </CreatePostsSnapPreviewContainer>
          )}
          <CreatePostsSnapBtn onPress={takePhoto}>
            <CreatePostsImgIcon
              source={imgIsAdded ? withImgPlaceholder : noImgPlaceholder}
            ></CreatePostsImgIcon>
          </CreatePostsSnapBtn>
          <CreatePostsInfo>
            {imgIsAdded ? "Редагувати фото" : "Завантажити фото"}
          </CreatePostsInfo>
        </CreatePostsImgContainer>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
          <CreatePostsDetailsContainer screenWidth={calculatedScreenWidth}>
            <CreatePostsInputContainer isInFocus={isCommentInFocus}>
              <CreatePostsInput
                placeholder="Назва..."
                value={photoData.comment}
                onChangeText={commentHandler}
                onFocus={() => onInputFocus("comment")}
                onBlur={() => onInputBlur("comment")}
                isInFocus={isCommentInFocus}
              />
            </CreatePostsInputContainer>
            <CreatePostsInputContainer isInFocus={isLocationInFocus} isLastItem>
              <CreatePostsLocationIconContainer>
                <EvilIcons name="location" size={24} color="#bdbdbd" />
              </CreatePostsLocationIconContainer>
              <CreatePostsInput
                placeholder="Місцина..."
                value={photoData.location}
                onChangeText={locationHandler}
                onFocus={() => onInputFocus("location")}
                onBlur={() => onInputBlur("location")}
                isInFocus={isLocationInFocus}
              />
            </CreatePostsInputContainer>
          </CreatePostsDetailsContainer>
        </KeyboardAvoidingView>
        <CreatePostsSubmitBtn
          submitIsDisabled={submitIsDisabled}
          disabled={submitIsDisabled}
          screenWidth={calculatedScreenWidth}
          onPress={onSubmit}
        >
          <CreatePostsSubmitText submitIsDisabled={submitIsDisabled}>
            Опублікувати
          </CreatePostsSubmitText>
        </CreatePostsSubmitBtn>
        <CreatePostsRemoveIconContainer onPress={removeData}>
          <AntDesign name="delete" size={24} color="#bdbdbd" />
        </CreatePostsRemoveIconContainer>
      </PostsContainer>
    </TouchableWithoutFeedback>
  );
}
