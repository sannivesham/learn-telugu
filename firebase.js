import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjWX_v7QgLMd_ypufFiyFItWj1JA8TFGw",
  authDomain: "aksharam-app.firebaseapp.com",
  projectId: "aksharam-app",
  storageBucket: "aksharam-app.firebasestorage.app",
  messagingSenderId: "176028549003",
  appId: "1:176028549003:web:95c135812d6ce55902798e",
  measurementId: "G-2BRP7FTB54"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
};
