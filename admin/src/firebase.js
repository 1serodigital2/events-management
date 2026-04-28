// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgK-cKH8Fr1Z9TrSYfD5La89NCrGRGr3Y",
  authDomain: "events-management-3fbe9.firebaseapp.com",
  projectId: "events-management-3fbe9",
  storageBucket: "events-management-3fbe9.firebasestorage.app",
  messagingSenderId: "105469852584",
  appId: "1:105469852584:web:df0a1f793147abdb3e3b9d",
  measurementId: "G-345ES5EYP4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
