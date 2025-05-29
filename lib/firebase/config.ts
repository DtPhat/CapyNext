import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLLkgq5T_je0mrs1RTvFCZsZSEu95w58E",
  authDomain: "capyventure.firebaseapp.com",
  projectId: "capyventure",
  storageBucket: "capyventure.appspot.com",
  messagingSenderId: "768942668913",
  appId: "1:768942668913:web:949eacd10dce00a566afd0",
  measurementId: "G-0DR29KWQM6"
};


const firebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(firebaseApp);
auth.languageCode = 'vi';