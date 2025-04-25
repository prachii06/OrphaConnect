// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"; 
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDxCBHbEst3vnBQtWy4IRedwexWyo5rHt8",
//   authDomain: "orphaconnect.firebaseapp.com",
//   projectId: "orphaconnect",
//   storageBucket: "orphaconnect.firebasestorage.app",
//   messagingSenderId: "25715633428",
//   appId: "1:25715633428:web:40d1ee820ae9d7504de601",
//   measurementId: "G-9ZT561HPBC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // export const auth = getAuth(app);
// const db = getFirestore(app); // ✅ this is what was missing

// export { auth, db }; // ✅ now you can import both


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

// Export the services
export { auth, db };
