import { Box, Typography } from "@mui/material";
import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export default function ProfileView() {
  const [username, setUsername] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [savedSchools, setSavedSchools] = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user) {
        const uid = auth.currentUser.uid;
        console.log(uid);
        const docRef = doc(db, "users", uid);
        const docSnap = getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
            setRole(docSnap.data().role);
            setSavedSchools(docSnap.data().savedSchools);
          } else {
            console.log("document does not exist");
          }
        });
      } else {
        console.log("not logged in");
      }
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Typography>{username}</Typography>
      <Typography>{role}</Typography>
      <Typography>
        {savedSchools ? savedSchools : "You have no saved schools"}
      </Typography>
    </Box>
  );
}
