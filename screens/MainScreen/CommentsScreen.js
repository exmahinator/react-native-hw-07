import React, { useState, useEffect } from "react";
import db from "../../friebase/config";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
// import { ref } from "firebase/storage";

import {
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  PostsContainer,
  PostsItemContainer,
  PostsItemImg,
  CommentsContainer,
  CommentsSubContainer,
  CommentsAvatarContainer,
  CommentsTextContainer,
  CommentsText,
  CommentsData,
  CommentsInputContainer,
  CommentsInput,
  CommentsSendBtn,
} from "../../ui/main";

import userData from "../../testData/userData";
import testImg from "../../assets/img/postsImg02_opt.jpg";
import testCommentAvatar from "../../assets/img/pseudoCommentAvatar_opt.png";

const calculatedScreenWidth = `${Math.floor(
  Dimensions.get("window").width - 32
)}px`;

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { id, uri } = route.params;

  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments(id);
    return () => setAllComments([])
  }, [id]);

  const onScreenPress = () => {
    Keyboard.dismiss();
  };

  const resultItem = userData.userPosts.find((post) => post.id === id);

  const getAllComments = async (id) => {
    // console.log("PostID at CommentScreen:", id);
    const colRef = collection(db, "posts", id, "comments");
    const docsSnap = await getDocs(colRef);

    docsSnap.forEach((doc) => {
      const commentId = doc.id;
      const commentData = doc.data();
      const resultComment = { ...commentData, commentId };
      // console.log("resultComment:", resultComment);

      setAllComments((prevState) => [...prevState, resultComment]);
    });
  };

  // console.log("AllComments:", allComments);

  const sendComment = async () => {
    const resultComment = { comment, nickname };
    const docRef = doc(db, "posts", id);
    const colRef = collection(docRef, "comments");
    addDoc(colRef, resultComment);
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={onScreenPress}>
      <PostsContainer screenWidth={calculatedScreenWidth}>
        <PostsItemContainer>
          <PostsItemImg
            isCommentPage
            source={(resultItem && testImg) || { uri }}
          ></PostsItemImg>
          <CommentsContainer>
            {/* <CommentsSubContainer>
              <CommentsAvatarContainer></CommentsAvatarContainer>
              <CommentsTextContainer>
                <CommentsText>Some text</CommentsText>
                <CommentsData>Some data</CommentsData>
              </CommentsTextContainer>
            </CommentsSubContainer> */}

            {allComments.length > 0 &&
              allComments.map((item) => {
                const { comment, commentId } = item;
                // const { name, avatar } = owner;
                if (item.nickname === nickname) {
                  return (
                    <CommentsSubContainer key={commentId}>
                      <CommentsTextContainer isOwner>
                        <CommentsText>{comment}</CommentsText>
                        <CommentsData>certain date</CommentsData>
                      </CommentsTextContainer>
                      <CommentsAvatarContainer
                        isOwner
                        source={testCommentAvatar}
                      ></CommentsAvatarContainer>
                    </CommentsSubContainer>
                  );
                }
                return (
                  <CommentsSubContainer key={commentId}>
                    <CommentsAvatarContainer
                      source={testCommentAvatar}
                    ></CommentsAvatarContainer>
                    <CommentsTextContainer>
                      <CommentsText>{comment}</CommentsText>
                      <CommentsData>certain date</CommentsData>
                    </CommentsTextContainer>
                  </CommentsSubContainer>
                );
              })}

            {resultItem &&
              resultItem.comments.comments.length > 0 &&
              resultItem.comments.comments.map((comment) => {
                const { id, owner, text, date } = comment;
                const { name, avatar } = owner;
                if (userData.name === name) {
                  return (
                    <CommentsSubContainer key={id}>
                      <CommentsTextContainer isOwner>
                        <CommentsText>{text}</CommentsText>
                        <CommentsData>{date}</CommentsData>
                      </CommentsTextContainer>
                      <CommentsAvatarContainer
                        isOwner
                        source={avatar}
                      ></CommentsAvatarContainer>
                    </CommentsSubContainer>
                  );
                }
                return (
                  <CommentsSubContainer key={id}>
                    <CommentsAvatarContainer
                      source={avatar}
                    ></CommentsAvatarContainer>
                    <CommentsTextContainer>
                      <CommentsText>{text}</CommentsText>
                      <CommentsData>{date}</CommentsData>
                    </CommentsTextContainer>
                  </CommentsSubContainer>
                );
              })}
          </CommentsContainer>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <CommentsInputContainer>
              <CommentsInput
                placeholder="Коментувати..."
                onChangeText={setComment}
                value={comment}
              ></CommentsInput>
              <CommentsSendBtn onPress={sendComment}>
                <Feather name="arrow-up" size={24} color="#fff" />
              </CommentsSendBtn>
            </CommentsInputContainer>
          </KeyboardAvoidingView>
        </PostsItemContainer>
      </PostsContainer>
    </TouchableWithoutFeedback>
  );
}
