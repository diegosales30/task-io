import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyByC-6bSY4-x4VmAmfsF0k915KDR5YzQ40",

  authDomain: "taskapp-8b022.firebaseapp.com",

  projectId: "taskapp-8b022",

  storageBucket: "taskapp-8b022.appspot.com",

  messagingSenderId: "159863253681",

  appId: "1:159863253681:web:7e54d3617fa9400017d090",

  measurementId: "G-MLJZMGYJQ4",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
