import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import React from 'react'

import {initializeApp} from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBlzvLIfshBsJsg97DoGkFO9olqi94AMEI",
    authDomain: "schoolsdb-be6ea.firebaseapp.com",
    projectId: "schoolsdb-be6ea",
    storageBucket: "schoolsdb-be6ea.appspot.com",
    messagingSenderId: "214316542823",
    appId: "1:214316542823:web:2e1ac5bcb5b0fe64465dc2",
    measurementId: "G-EQQ5QDVJWG"
});

// initialize authentication and database
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function ProfileView() {
  const [username, setUsername] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [savedSchools, setSavedSchools] = React.useState(null)

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      unsub();
      if(user) {
        const uid = auth.currentUser.uid
        console.log(uid)
        const docRef = doc(db, "users", uid);
        const docSnap = getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
            setRole(docSnap.data().role);
            setSavedSchools(docSnap.data().savedSchools);
          }
          else {
            console.log("document does not exist")
          }
        });
      }
      else {
        console.log("not logged in");
      }
    })
  }, [])

  return (
    <Box sx = {{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      flexDirection: "column"
    }}>
      <Typography>{username}</Typography>
      <Typography>{role}</Typography>
      <Typography>{savedSchools ? savedSchools : "You have no saved schools"}</Typography>
    </Box>
  )
}