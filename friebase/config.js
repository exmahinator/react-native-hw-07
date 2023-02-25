// Import the functions you need from the SDKs you need
// import * as firebase from "firebase"
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZXg8iVEN6ZlbBTx8oJQCVEPf1pITi7R0",
  authDomain: "myreactnativehw.firebaseapp.com",
  projectId: "myreactnativehw",
  storageBucket: "myreactnativehw.appspot.com",
  messagingSenderId: "1023214158467",
  appId: "1:1023214158467:web:10086375f636e9e0e611b6",
  measurementId: "G-MNWVLT4H4Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;
// const analytics = getAnalytics(app);
