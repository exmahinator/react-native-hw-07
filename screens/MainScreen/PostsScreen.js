import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import db from "../../friebase/config";
import { collection, getDocs, query } from "firebase/firestore";
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
import commentIcon from "../../assets/img/commentIcon_opt.png";
import commentIconFilled from "../../assets/img/commentIconFilled_opt.png";
import locationIcon from "../../assets/img/locationIcon_opt.png";

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    await querySnapshot.forEach((doc) => {
      const { id } = doc;
      const postData = doc.data();

      setPosts((prevState) => [...prevState, { id, ...postData }]);
    });
  };

  const navigateToComments = (id, uri) => {
    navigation.navigate("Коментарі", { id, uri });
  };

  const navigateToLocation = (latitude, longitude) => {
    navigation.navigate("Мапа", { latitude, longitude });
  };

  console.log("MyState:", posts);

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
        {posts.length > 0 &&
          posts.map(
            ({ id, photo: uri, comment, location, latitude, longitude }) => {
              console.log("My post ID inside PostsScreen:", id);
              return (
                <PostsItemContainer key={id}>
                  <PostsItemImg source={{ uri }}></PostsItemImg>
                  <PostsItemDescription>{comment}</PostsItemDescription>
                  <PostsItemSubContainer>
                    <PostsItemDetailsContainer
                      activeOpacity={0.5}
                      onPress={() => navigateToComments(id, uri)}
                    >
                      <PostsItemIcon source={commentIcon}></PostsItemIcon>
                      <PostsItemResponsesAmount textIsHighlighted={false}>
                        {0}
                      </PostsItemResponsesAmount>
                    </PostsItemDetailsContainer>
                    <PostsItemDetailsContainer
                      onPress={() => navigateToLocation(latitude, longitude)}
                      flexGrow
                      activeOpacity={0.5}
                    >
                      <PostsItemIcon source={locationIcon}></PostsItemIcon>
                      <PostsItemResponsesAmount
                        isLink
                        textIsHighlighted={location !== ""}
                      >
                        {location}
                      </PostsItemResponsesAmount>
                    </PostsItemDetailsContainer>
                  </PostsItemSubContainer>
                </PostsItemContainer>
              );
            }
          )}
        {userData.userPosts.map(
          ({ id, image, description, comments, imgLocation }) => {
            const latitude = 50.450001;
            const longitude = 30.523333;
            const { amountOfComments } = comments;

            return (
              <PostsItemContainer key={id}>
                <PostsItemImg source={image}></PostsItemImg>
                <PostsItemDescription>{description}</PostsItemDescription>
                <PostsItemSubContainer>
                  <PostsItemDetailsContainer
                    activeOpacity={0.5}
                    onPress={() => navigateToComments(id)}
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
                  <PostsItemDetailsContainer
                    onPress={() => navigateToLocation(latitude, longitude)}
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
    </PostsContainer>
  );
}
