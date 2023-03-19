import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "@mui/material";

import React from 'react'

import {initializeApp} from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyATU3EhmKaM9AizPjVfgpqYzbNNe7ad4ns",
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

  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = getDoc(docRef).then(docSnap => {
          if (docSnap.exists()) {
            console.log(docSnap.data())
            return setData(docSnap.data())
          }
        });
      }
      else {
        console.log("Not logged in")
        return null;
      }
    })
  }, [])

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 16, sm: 8, md: 16 }}>
        <Grid item xs={16} sm={4} md={16} >
          <Paper elevation={0}>
            {data.username + data.role}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}