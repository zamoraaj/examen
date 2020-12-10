import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAYPsx88mJmdATufFxIEQfYBoSm7zhxIE0",
  authDomain: "pasteles-firebase.firebaseapp.com",
  projectId: "pasteles-firebase",
  storageBucket: "pasteles-firebase.appspot.com",
  messagingSenderId: "323587626342",
  appId: "1:323587626342:web:9657a6afef2356f7cae4a7",
  measurementId: "G-CZYRGWYEQ9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
