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
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore'

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
const db = getFirestore(firebaseApp);

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}

const loginEmailPassword = async (email, password) => {
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

const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
}

const createAccount = async(email, password) => {
  e.preventDefault();

  await createUserWithEmailAndPassword(auth, email, password).then(cred => {
    return setDoc(doc(db, "users", cred.user.uid), {
      username: email,
      role: role,
      saved_schools: null
    })
  })
}

export default {signInWithGoogle, loginEmailPassword, signUpWithGoogle, createAccount}
