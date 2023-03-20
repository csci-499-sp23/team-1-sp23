//ACTIONS CREATOR FOR CRUD OPERATIONS 
//WHEN CREATING, REMOVING, UPDATING, DELETING ACCOUNTS OR REVIEWS

import { initializeApp } from 'firebase/app'
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db } from '../config/firebase';

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
