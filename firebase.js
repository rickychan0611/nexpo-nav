export const firebase = require("firebase");
// Required for side-effects
require("firebase/auth");
require("firebase/firestore");

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCOYD4TkCZvjzC_BIHSj82VujQXQ3gQ6jA",
        authDomain: "tintin-store.firebaseapp.com",
        databaseURL: "https://tintin-store.firebaseio.com",
        projectId: "tintin-store",
        storageBucket: "tintin-store.appspot.com",
        messagingSenderId: "392223913368",
        appId: "1:392223913368:web:29f397f9ce47c73e6267ed",
        measurementId: "G-TJWHT2C20L"
    });
};

export const db = firebase.firestore();
export const auth = firebase.auth()
