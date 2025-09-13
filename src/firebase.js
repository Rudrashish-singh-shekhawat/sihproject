import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyAJ_PjMgmtkBfaSoSoFS0X_FUVkZ4y6uYw",
  authDomain: "energy-b0085.firebaseapp.com",
  projectId: "energy-b0085",
  storageBucket: "energy-b0085.firebasestorage.app",
  messagingSenderId: "836153420361",
  appId: "1:836153420361:web:2251fe12827efcaa66ed98",
  databaseURL : "https://energy-b0085-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };