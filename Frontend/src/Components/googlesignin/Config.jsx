import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const firebaseConfig = {
    apiKey: "AIzaSyA6R6x6ykrnT0NnXbcckUQD9x1ZscreR1E",
    authDomain: "cartrabit.firebaseapp.com",
    projectId: "cartrabit",
    storageBucket: "cartrabit.appspot.com",
    messagingSenderId: "651084992094",
    appId: "1:651084992094:web:5c00c74912c1b48669aecf"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider,signInWithPopup,signOut,signInWithEmailAndPassword, createUserWithEmailAndPassword };