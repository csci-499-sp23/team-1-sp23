import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

export default function ProfileView() {
  const [username, setUsername] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [savedSchools, setSavedSchools] = React.useState(null);
  const [value, setValue] = React.useState(0);

  // React.useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = auth.currentUser.uid;
  //       console.log(uid);
  //       const docRef = doc(db, "users", uid);
  //       const docSnap = getDoc(docRef).then((docSnap) => {
  //         if (docSnap.exists()) {
  //           setUsername(docSnap.data().username);
  //           setRole(docSnap.data().role);
  //           setSavedSchools(docSnap.data().savedSchools);
  //         } else {
  //           console.log("document does not exist");
  //         }
  //       });
  //     } else {
  //       console.log("not logged in");
  //     }
  //   });
  // }, []);

  const handleTab = (_, value) => {
    setValue(value);
  };

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
            Hello, User 👋
          </Typography>
          <Box
            sx={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              backgroundColor: colors.black,
            }}
          >
            <img />
          </Box>
        </Box>
        <Box sx={{ my: 3 }}>
          <Tabs value={value} onChange={handleTab}>
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
