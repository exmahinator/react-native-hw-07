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
    getAllComments();
    // console.log("MyState:", posts);
  }, []);

  // console.log("My post ID:", id);
  // console.log("Commentator nickname:", nickname);
  const onScreenPress = () => {
    Keyboard.dismiss();
  };
  const resultItem = userData.userPosts.find((post) => post.id === id);

  const getAllComments = async () => {
    const colRef = collection(db, "posts", id, "comments");
    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      // const { id } = doc;
      const commentData = doc.data();
      // const resultComment = {id, ...commentData}
      const resultComment = { ...commentData };
      console.log("resultComment:", resultComment);
      // setAllComments((prevState) => [...prevState, { id, ...commentData }]);
      // console.log("id:", id);
      // console.log(doc.data());

      const isExist = allComments.find((comment) => comment.id === doc.id);

      if (isExist) {
        return;
      }

      setAllComments((prevState) => [...prevState, resultComment]);
      // console.log("AllComments:", allComments);
    });
    // const docRef = doc(db, "posts", id);
    // const colRef = collection(docRef, "comments");
    // const colSnap = await getDoc(colRef);
    // console.log("All comments:", colSnap.data());

    // const docRef = doc(db, "posts", id);
    // const colRef = collection(docRef, "comments");
    // const querySnapshot = await getDocs(
    //   collection(db, "posts", id, "comments")
    // );
    // await querySnapshot.forEach((doc) => {
    //   const { id, comment, nickname } = doc;
    //   setAllComments((prevState) => [...prevState, { id, comment, nickname }]);
    //   console.log("AllComments:", allComments);
    // });
  };

  console.log("AllComments:", allComments);

  const sendComment = async () => {
    const resultComment = { comment, nickname };

    // const docRef = doc(db, "posts", id, "comments");

    const docRef = doc(db, "posts", id);
    const colRef = collection(docRef, "comments");
    addDoc(colRef, resultComment);

    // const docSnap = await getDoc(docRef);
    // const result = docSnap.data();
    // console.log("Current post after data() method:", result);

    // setDoc(docRef, resultComment);

    // setDoc(docRef, resultComment, { merge: true });

    // console.log("Current post before getDoc:", docRef);
    // const docSnap = await getDoc(docRef);
    // console.log("Current post after getDoc:", docSnap);
    // const result = docSnap.data();
    // console.log("Current post after data() method:", result);

    // const docRef = ref(db, "posts");
    // console.log("My Ref:", docRef);
    // const myPost = doc(id);
    // console.log("My post on Firebase:", myPost);
    // console.log("Our comment:", comment);
    // console.log("Sending a comment...");
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
                const { comment } = item;
                // const { name, avatar } = owner;
                if (item.nickname === nickname) {
                  return (
                    <CommentsSubContainer key={id}>
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
                  <CommentsSubContainer key={id}>
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
