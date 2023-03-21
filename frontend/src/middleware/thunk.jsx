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
