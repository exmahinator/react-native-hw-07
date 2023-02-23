import db from "../../friebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  //   onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("User:", user);
    } catch (error) {
      console.log("error:", error);
      console.log("error message:", error.message);
    }
  };

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
      //   console.log("User:", user);
    } catch (error) {
      console.log("error:", error);
      console.log("error message:", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    await auth.signOut();
  } catch (error) {
    console.log("error:", error);
    console.log("error message:", error.message);
  }
};

// export const onAuthUserStateChanged = () => async (dispatch, getState) => {
//     const auth = getAuth();
//     try {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//               return user
//             } else {
//               console.log("Some error");
//               return
//             }
//           });
//     } catch (error) {
//       console.log("error:", error);
//       console.log("error message:", error.message);
//     }
//   };
