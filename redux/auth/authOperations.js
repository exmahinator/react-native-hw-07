import db from "../../friebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      console.log("User at log in:", user);
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
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      // console.log("Current user:", user);
      await updateProfile(user, { displayName: nickname });
      // console.log("User after update:", user);
      const updatedUser = await auth.currentUser;
      console.log("Updated user:", updatedUser);
      console.log("Updated user ID:", updatedUser.uid);
      console.log("Updated user nickname:", updatedUser.displayName);
      dispatch(
        updateUserProfile({
          userId: updatedUser.uid,
          nickname: updatedUser.displayName,
        })
      );
    } catch (error) {
      console.log("error:", error);
      console.log("error message:", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    console.log("Signing out...");
    const auth = getAuth();
    await auth.signOut();
    dispatch(authSignOut());
    console.log("Signed out successfully");
  } catch (error) {
    console.log("error:", error);
    console.log("error message:", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("Logged user:", user);

      dispatch(authStateChange({ stateChange: true }));
      dispatch(
        updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
    } else {
      console.log("There is no user logged in!");
    }
  });
};
