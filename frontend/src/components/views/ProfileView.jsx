import { Box, Tab, Tabs, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../config/firebase";
import Avatar from '@mui/material/Avatar'

export default function ProfileView() {
  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");
  const [savedSchools, setSavedSchools] = React.useState([]);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "users", uid);
        const schoolRef = doc(db, "school", "reviews")

        getDoc(schoolRef).then((docSnap) => {
          if(docSnap.exists()) {
            console.log(docSnap.data())
          }
        })

        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().username.split("@").at(0));
            setRole(docSnap.data().role);
            setSavedSchools(docSnap.data().saved_schools);

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
        height: "100vh",
        backgroundColor: colors.white,
      }}
    >
      <Box sx={{ p: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: colors.black,
              fontSize: "2rem",
            }}
          >
            Hello, {username}👋
          </Typography>
          <Box>
            <Avatar sx={{
              width: "75px",
              height: "75px",
              backgroundColor: colors.black,
            }}>{username[0]}</Avatar>
          </Box>
        </Box>
        <Box sx={{ my: 3 }}>
          <Tabs value={value} onChange={(_, val) => setValue(val)}>
            <Tab sx={{ mr: 5 }} label="Your Reviews" />
            <Tab sx={{ mr: 5 }} label="Saved Schools" />
          </Tabs>
          <Box sx={{ my: 3 }}>
            <TabPanel value={value} index={0}>
              <Typography sx={{ color: colors.black }}>
                You do not have any reviews.
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography sx={{ color: colors.black }}>

                You do not have any saved schools.
              </Typography>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const TabPanel = ({ value, index, children }) => {
  return value === index && children;
};

const colors = {
  white: "#f8fafc",
  black: "#0f172a",
};