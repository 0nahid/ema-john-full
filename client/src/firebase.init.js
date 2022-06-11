// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp3h0g50Xiv0avivp62LoBTIAXkaqs8Oc",
  authDomain: "auth-template-firebase.firebaseapp.com",
  projectId: "auth-template-firebase",
  storageBucket: "auth-template-firebase.appspot.com",
  messagingSenderId: "151434870168",
  appId: "1:151434870168:web:b718d93d5b27f17ded7fed",
  measurementId: "G-7SWV1Z2V0H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;