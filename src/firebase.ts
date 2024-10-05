// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvWmTmmet_lyPl3f07N1LtT3ZsQahIHs4",
  authDomain: "dompixelblog.firebaseapp.com",
  projectId: "dompixelblog",
  storageBucket: "dompixelblog.appspot.com",
  messagingSenderId: "345134587277",
  appId: "1:345134587277:web:6bfca841299062cf32b1c4",
  measurementId: "G-EJTVD57R1Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
