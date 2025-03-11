import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAQ4TB2hkqjTfzdsFzGpR9zd5o1JHRy6w",
  authDomain: "roadside-assistance-ravb.firebaseapp.com",
  projectId: "roadside-assistance-ravb",
  storageBucket: "roadside-assistance-ravb.firebasestorage.app",
  messagingSenderId: "291088800152",
  appId: "1:291088800152:web:2e1be212adc486640fb3ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

