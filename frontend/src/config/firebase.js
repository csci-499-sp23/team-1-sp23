import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCivsiI5mRGqKokEqvtrrlOckWLzUwCzAE",
  authDomain: "schoolsdb-be6ea.firebaseapp.com",
  projectId: "schoolsdb-be6ea",
  storageBucket: "schoolsdb-be6ea.appspot.com",
  messagingSenderId: "214316542823",
  appId: "1:214316542823:web:2e1ac5bcb5b0fe64465dc2",
  measurementId: "G-EQQ5QDVJWG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
