//ACTIONS CREATOR FOR CRUD OPERATIONS 
//WHEN CREATING, REMOVING, UPDATING, DELETING ACCOUNTS OR REVIEWS

import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  connectAuthEmulator, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyATU3EhmKaM9AizPjVfgpqYzbNNe7ad4ns",
    authDomain: "schoolsdb-be6ea.firebaseapp.com",
    projectId: "schoolsdb-be6ea",
    storageBucket: "schoolsdb-be6ea.appspot.com",
    messagingSenderId: "214316542823",
    appId: "1:214316542823:web:2e1ac5bcb5b0fe64465dc2",
    measurementId: "G-EQQ5QDVJWG"
});

const auth = getAuth(firebaseApp);

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

const loginEmailPassword = async (e) => {
e.preventDefault();
try {
    await signInWithEmailAndPassword(auth, email, password).then(cred => {
    console.log(cred.user)
    });
}
catch (error) {
    alert(error.code)
}
}
