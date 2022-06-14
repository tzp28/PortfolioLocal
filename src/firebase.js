import firebase from "firebase/compat/app"

import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import "firebase/compat/auth"
import {getFirestore} from "firebase/firestore";
import {useEffect, useState} from "react";
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID


})

export const db = getFirestore (app);
export const auth = getAuth();


export default app;
export function sUp (email, password){
    return createUserWithEmailAndPassword(auth,email,password);
}

export function log (email, password){
    return signInWithEmailAndPassword(auth,email,password);
}

export function logOut(){
    return auth.signOut();
}


