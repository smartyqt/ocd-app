// firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3c2G6PlAfPhIN35vqvaPVDfdKtQJ4P5c",
  authDomain: "ocd-app-f4260.firebaseapp.com",
  projectId: "ocd-app-f4260",
  storageBucket: "ocd-app-f4260.appspot.com", // ✅ FIXED: should be .appspot.com
  messagingSenderId: "663673385945",
  appId: "1:663673385945:web:cf30ca4199e23d30e35fc8",
  measurementId: "G-6JB2S44MQS"
};

// Initialize Firebase with timeout settings
const app = initializeApp(firebaseConfig);

// ✅ Add persistent Auth with timeout settings
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Services with timeout settings
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };