
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxCBHbEst3vnBQtWy4IRedwexWyo5rHt8",
  authDomain: "orphaconnect.firebaseapp.com",
  projectId: "orphaconnect",
  storageBucket: "orphaconnect.firebasestorage.app",
  messagingSenderId: "25715633428",
  appId: "1:25715633428:web:40d1ee820ae9d7504de601",
  measurementId: "G-9ZT561HPBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);  // Analytics is initialized but not exported

// Initialize services
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore Database
const storage = getStorage(app);
// Export the services

export {auth,db,storage}
