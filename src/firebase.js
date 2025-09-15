import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBsrmBryOTGeE-NXpgQYGQiTLn9ztw4BLo",
  authDomain: "energy-7868c.firebaseapp.com",
  databaseURL: "https://energy-7868c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "energy-7868c",
  storageBucket: "energy-7868c.firebasestorage.app",
  messagingSenderId: "397569092931",
  appId: "1:397569092931:web:449dd67cead94c330913f6"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };