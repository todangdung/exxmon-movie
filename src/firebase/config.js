import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { async } from "@firebase/util";

import { addDocument } from "./services";

const firebaseConfig = {
  apiKey: "AIzaSyAyPt4_7kuCBGVdub0w3oPKnhZbWbgP_Zc",
  authDomain: "movie-app-f1010.firebaseapp.com",
  projectId: "movie-app-f1010",
  storageBucket: "movie-app-f1010.appspot.com",
  messagingSenderId: "463600851376",
  appId: "1:463600851376:web:6582990bb45a7ac9465e75",
  measurementId: "G-VSWK5N7B72",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
