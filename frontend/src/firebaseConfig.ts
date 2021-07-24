import "firebase/auth";

import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArsQyeehCd8c-pdZby7rULWMFdB6uqi7o",
    authDomain: "fibudget.firebaseapp.com",
    projectId: "fibudget",
    storageBucket: "fibudget.appspot.com",
    messagingSenderId: "317385417651",
    appId: "1:317385417651:web:dc6a603c00ee1b242be1c6"
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );

export const authProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle(): void {
    firebase.auth().signInWithPopup( authProvider );
}
export function signOut(): void {
    firebase.auth().signOut();
}

export default firebase;