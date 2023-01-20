import { initializeApp } from "firebase/app";

import { getAuth, signOut, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, serverTimestamp, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjBUWLbTJcaF14Rm0uhxm0gFPMoARBba0",
  authDomain: "whats-a-students-to-do.firebaseapp.com",
  projectId: "whats-a-students-to-do",
  storageBucket: "whats-a-students-to-do.appspot.com",
  messagingSenderId: "189378655493",
  appId: "1:189378655493:web:2f74d1f9deaa37baa7736c"
};

// Initialize Firebase
//For auth
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};


// log out
const logoutButton = document.querySelector("#logout")!;
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .catch((err) => {
      console.log(err.message);
    });
});


