import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcHzJe5YPQKJHj-xgnm6Dq1qGazCSYvmE",
  authDomain: "ppmail-8483f.firebaseapp.com",
  projectId: "ppmail-8483f",
  storageBucket: "ppmail-8483f.appspot.com",
  messagingSenderId: "269267797455",
  appId: "1:269267797455:web:80506bca17cd5d86537eba",
  measurementId: "G-4RJYX44NSB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)