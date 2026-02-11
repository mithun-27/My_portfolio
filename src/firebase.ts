import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBf1Hl99iVcBSw5PSslkjWzoPzEyXZuMTg",
    authDomain: "mithun-portfolio-30c4f.firebaseapp.com",
    projectId: "mithun-portfolio-30c4f",
    storageBucket: "mithun-portfolio-30c4f.firebasestorage.app",
    messagingSenderId: "147229608856",
    appId: "1:147229608856:web:99eb4dfb2a624bef2d39ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized:", app.name);

export { app, db };
