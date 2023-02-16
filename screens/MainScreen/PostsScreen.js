import React from "react";
import {
  PostsContainer,
  PostsOwnerContainer,
  PostsOwnerAvatar,
  PostsOwnerInfoContainer,
  PostsOwnerInfoText,
  PostsListContainer,
  PostsItemContainer,
  PostsItemImg,
  PostsItemDescription,
  PostsItemSubContainer,
  PostsItemDetailsContainer,
  PostsItemIcon,
  PostsItemResponsesAmount,
} from "../../ui/main";

import userData from "../../testData/userData";
import testImg01 from "../../assets/img/postsImg01_opt.jpg";
import commentIcon from "../../assets/img/commentIcon_opt.png";
import commentIconFilled from "../../assets/img/commentIconFilled_opt.png";
import likeIcon from "../../assets/img/likeIconFilled_opt.png";
import locationIcon from "../../assets/img/locationIcon_opt.png";

export default function PostsScreen() {
  console.log(userData);
  return (
    <PostsContainer>
      <PostsOwnerContainer>
        <PostsOwnerAvatar
          source={userData.userAvatar}
          resizeMode="cover"
        ></PostsOwnerAvatar>
        <PostsOwnerInfoContainer>
          <PostsOwnerInfoText isBold>{userData.name}</PostsOwnerInfoText>
          <PostsOwnerInfoText>{userData.email}</PostsOwnerInfoText>
        </PostsOwnerInfoContainer>
      </PostsOwnerContainer>
      <PostsListContainer>
        {/* <PostsItemContainer>
          <PostsItemImg source={testImg01}></PostsItemImg>
          <PostsItemDescription>Ліс</PostsItemDescription>
          <PostsItemSubContainer>
            <PostsItemDetailsContainer>
              <PostsItemIcon source={commentIcon}></PostsItemIcon>
              <PostsItemResponsesAmount>0</PostsItemResponsesAmount>
            </PostsItemDetailsContainer>
            <PostsItemDetailsContainer>
              <PostsItemIcon source={likeIcon}></PostsItemIcon>
              <PostsItemResponsesAmount>0</PostsItemResponsesAmount>
            </PostsItemDetailsContainer>
            <PostsItemDetailsContainer>
              <PostsItemIcon source={locationIcon}></PostsItemIcon>
              <PostsItemResponsesAmount>Some location</PostsItemResponsesAmount>
            </PostsItemDetailsContainer>
          </PostsItemSubContainer>
        </PostsItemContainer> */}
        {userData.userPosts.map(
          ({ id, image, description, comments, imgLocation }) => {
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
    </PostsContainer>
  );
}
