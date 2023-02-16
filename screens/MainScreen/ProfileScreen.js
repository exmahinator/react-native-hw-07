import React from "react";
import {
  AuthContainer,
  AuthBackground,
  AuthSubContainer,
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
} from "../../ui/main";

import backgroundImg from "../../assets/img/backgroundPhoto_opt.jpg";
import userData from "../../testData/userData";
import removeAvatar from "../../assets/img/remove_opt.png";
import commentIcon from "../../assets/img/commentIcon_opt.png";
import commentIconFilled from "../../assets/img/commentIconFilled_opt.png";
import likeIcon from "../../assets/img/likeIconFilled_opt.png";
import locationIcon from "../../assets/img/locationIcon_opt.png";

export default function ProfileScreen() {
  const avatarHandler = () => {
    console.log("Avatar will be removed shortly");
  };

  return (
    <AuthContainer>
      <AuthBackground isProfilePage source={backgroundImg}>
        <AuthSubContainer isProfilePage>
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
                      <PostsItemDetailsContainer activeOpacity={0.5}>
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
                      <PostsItemDetailsContainer flexGrow activeOpacity={0.5}>
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
        </AuthSubContainer>
      </AuthBackground>
    </AuthContainer>
  );
}
