import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_KEY,
    authDomain: "talkify-c41b9.firebaseapp.com",
    projectId: "talkify-c41b9",
    storageBucket: "talkify-c41b9.appspot.com",
    messagingSenderId: "163708876772",
    appId: "1:163708876772:web:d34e7b0e5c057cff63f9f1",
    measurementId: "G-BG15G6WF9E",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
