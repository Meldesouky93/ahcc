// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getStorage } from "firebase/storage"; // For file storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa8iJ0GzHgDNXCd9DPJcZ1bsv8av2U7ao",
  authDomain: "cdata-a9e0c.firebaseapp.com",
  databaseURL: "https://cdata-a9e0c-default-rtdb.firebaseio.com",
  projectId: "cdata-a9e0c",
  storageBucket: "cdata-a9e0c.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "816125823691",
  appId: "1:816125823691:web:4b3282e7f0a53baa68294e",
  measurementId: "G-CHC39WR931"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore database
const realtimeDB = getDatabase(app); // Realtime Database
const storage = getStorage(app); // Cloud Storage

// Export instances for use in other files
export { app, analytics, auth, db, realtimeDB, storage };
