
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCV3l7ePRDTCwdLJbGnRCI1gu_dg-_guaI",
    authDomain: "twitter-7b2e9.firebaseapp.com",
    projectId: "twitter-7b2e9",
    storageBucket: "twitter-7b2e9.firebasestorage.app",
    messagingSenderId: "926138374074",
    appId: "1:926138374074:web:29c31687189d4332fa2f83",
    measurementId: "G-QJ80HXHKEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)


export { db, auth, app, };



