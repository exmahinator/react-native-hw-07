import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../friebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  AuthContainer,
  AuthBackground,
  AuthAvatarBtn,
  AuthAvatarBackground,
  AuthAvatarIcon,
  AuthTextContainer,
  AuthPageText,
} from "../../ui/auth";

import {
  PostsListContainer,
  PostsItemContainer,
  PostsItemImg,
  PostsItemDescription,
  PostsItemSubContainer,
  PostsItemDetailsContainer,
  PostsItemIcon,
  PostsItemResponsesAmount,
  ProfileSubContainer,
  ProfileLogOutBtn,
} from "../../ui/main";

import { Feather } from "@expo/vector-icons";

import backgroundImg from "../../assets/img/backgroundPhoto_opt.jpg";
import userData from "../../testData/userData";
import removeAvatar from "../../assets/img/remove_opt.png";
import commentIcon from "../../assets/img/commentIcon_opt.png";
import commentIconFilled from "../../assets/img/commentIconFilled_opt.png";
import likeIcon from "../../assets/img/likeIconFilled_opt.png";
import locationIcon from "../../assets/img/locationIcon_opt.png";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    // const colRef = collection(db, "posts");
    // const q = query(colRef, where("userId", "==", userId));
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("Doc inside profile:", doc.data());
      // const userPosts = doc.data()
      // console.log(`Current account posts: ${userPosts}`);
    });
    // console.log(
    //   querySnapshot.forEach((doc) => {return ({
    //     ...doc.data(),
    //   })})
    // );
  };

  const avatarHandler = () => {
    console.log("Avatar will be removed shortly");
  };

  const navigateToComments = (id) => {
    navigation.navigate("??????????????????", { id });
  };

  const navigateToLocation = () => {
    navigation.navigate("????????");
  };

  return (
    <AuthContainer>
      <AuthBackground isProfilePage source={backgroundImg}>
        <ProfileSubContainer>
          <ProfileLogOutBtn onPress={() => dispatch(authSignOutUser())}>
            <Feather name="log-out" size={24} color="#bdbdbd" />
          </ProfileLogOutBtn>
          <AuthAvatarBtn onPress={() => avatarHandler()} activeOpacity={0.5}>
            <AuthAvatarBackground
              source={userData.userAvatar}
            ></AuthAvatarBackground>
            <AuthAvatarIcon
              source={removeAvatar}
              isFilled
              resizeMode="cover"
            ></AuthAvatarIcon>
          </AuthAvatarBtn>
          <AuthTextContainer>
            <AuthPageText>{userData.name}</AuthPageText>
          </AuthTextContainer>
          <PostsListContainer>
            {userData.userPosts.map(
              ({
                id,
                image,
                description,
                comments,
                amountOfLikes,
                imgLocation,
              }) => {
                const { amountOfComments } = comments;

                return (
                  <PostsItemContainer key={id}>
                    <PostsItemImg source={image}></PostsItemImg>
                    <PostsItemDescription>{description}</PostsItemDescription>
                    <PostsItemSubContainer>
                      <PostsItemDetailsContainer
                        onPress={() => navigateToComments(id)}
                        activeOpacity={0.5}
                      >
                        <PostsItemIcon
                          source={
                            amountOfComments ? commentIconFilled : commentIcon
                          }
                        ></PostsItemIcon>
                        <PostsItemResponsesAmount
                          textIsHighlighted={amountOfComments !== 0}
                        >
                          {amountOfComments}
                        </PostsItemResponsesAmount>
                      </PostsItemDetailsContainer>
                      <PostsItemDetailsContainer marginLeft activeOpacity={0.5}>
                        <PostsItemIcon source={likeIcon}></PostsItemIcon>
                        <PostsItemResponsesAmount
                          textIsHighlighted={amountOfLikes !== 0}
                        >
                          {amountOfLikes}
                        </PostsItemResponsesAmount>
                      </PostsItemDetailsContainer>
                      <PostsItemDetailsContainer
                        onPress={() => navigateToLocation()}
                        flexGrow
                        activeOpacity={0.5}
                      >
                        <PostsItemIcon source={locationIcon}></PostsItemIcon>
                        <PostsItemResponsesAmount
                          isLink
                          textIsHighlighted={imgLocation !== ""}
                        >
                          {imgLocation}
                        </PostsItemResponsesAmount>
                      </PostsItemDetailsContainer>
                    </PostsItemSubContainer>
                  </PostsItemContainer>
                );
              }
            )}
          </PostsListContainer>
        </ProfileSubContainer>
      </AuthBackground>
    </AuthContainer>
  );
}
