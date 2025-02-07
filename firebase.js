import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    onSnapshot,
    getDocs,

} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyAV7dFhyqLbmfVtpUIFM6R04bXEprEmQcY",
    authDomain: "asdfsdf-6f1e2.firebaseapp.com",
    projectId: "asdfsdf-6f1e2",
    storageBucket: "asdfsdf-6f1e2.firebasestorage.app",
    messagingSenderId: "315766363992",
    appId: "1:315766363992:web:3b7536b3c5be11ee12f72d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    db,
    collection,
    doc,
    addDoc,
    setDoc,
    signOut,
    provider,
    signInWithPopup,
    sendPasswordResetEmail,
    onSnapshot,
    getDocs,
}