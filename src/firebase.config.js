// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDou5kiNLvnARtBJ1g0JVMoiWW36mEeH0E",
  authDomain: "frontlogin-ee57a.firebaseapp.com",
  projectId: "frontlogin-ee57a",
  storageBucket: "frontlogin-ee57a.appspot.com",
  messagingSenderId: "819026715791",
  appId: "1:819026715791:web:bfcd19434a36c75f21bcfa",
  measurementId: "G-57C54KTY0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);