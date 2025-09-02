// ~/frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAmBuHcfrttFRcSxtXLcI5TI7s_9qLLjp4",
  authDomain: "cleanpro-site.firebaseapp.com",
  projectId: "cleanpro-site",
  storageBucket: "cleanpro-site.appspot.com", // 🔹 fixed suffix
  messagingSenderId: "5539254765",
  appId: "1:5539254765:web:44c0236e1986d7b6b797e4",
  measurementId: "G-H2P7M2Y2DT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export Firestore + Storage for use
export const db = getFirestore(app);
export const storage = getStorage(app);
