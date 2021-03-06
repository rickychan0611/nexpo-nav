import { Platform } from "react-native";

export const firebase = require("firebase");
// Required for side-effects
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");

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
export const database = firebase.database();
export const auth = firebase.auth()
export const storage = firebase.storage()
export const functions = firebase.functions()


if (__DEV__ || Platform.OS === "web") {
    functions.useFunctionsEmulator('http://localhost:5001')
}
if (__DEV__ || Platform.OS === "android") {
    functions.useFunctionsEmulator('http://10.0.2.2:5001')
}
if (__DEV__ || Platform.OS === "ios") {
    functions.useFunctionsEmulator('http://localhost:5001')
}
