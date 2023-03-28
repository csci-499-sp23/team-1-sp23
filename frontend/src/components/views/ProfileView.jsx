import { Box, IconButton, Paper, Rating, Tab, Tabs, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../config/firebase";
import Avatar from "@mui/material/Avatar";

import EditIcon from '@mui/icons-material/Edit';

import EditModal from '../EditModal'


export default function ProfileView() {
  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");
  const [savedSchools, setSavedSchools] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "users", uid);

        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUsername(docSnap.data().username.split("@").at(0));
            setRole(docSnap.data().role);
            setSavedSchools(docSnap.data().saved_schools);
            setReviews(docSnap.data().reviews);
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
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: colors.white,
        }}
      >
        <Box sx={{ p: { xs: 1, md: 5 } }}>
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
              <Avatar
                sx={{
                  width: "75px",
                  height: "75px",
                  backgroundColor: colors.black,
                }}
              >
                {username[0]}
              </Avatar>
            </Box>
          </Box>
          <Box sx={{ my: 3 }}>
            <Tabs value={value} onChange={(_, val) => setValue(val)}>
              <Tab
                sx={{ mr: 5, fontSize: { xs: "1rem", md: "1.25rem" } }}
                label="Your Reviews"
              />
              <Tab
                sx={{ mr: 5, fontSize: { xs: "1rem", md: "1.25rem" } }}
                label="Saved Schools"
              />
            </Tabs>
            <Box sx={{ my: 3 }}>
              <TabPanel value={value} index={0}>
                {reviews.length === 0 ? (
                  <Typography sx={{ color: colors.black }}>
                    You do not have any reviews.
                  </Typography>
                ) : (
                  reviews.map((data) => (
                    <ReviewCard {...data} key={data.school} open={open}/>
                  ))
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {savedSchools.length === 0 ? (
                  <Typography sx={{ color: colors.black }}>
                    You do not have any saved schools.
                  </Typography>
                ) : (
                  savedSchools.map((name, i) => (
                    <SavedSchool schoolName={name} key={i} />
                  ))
                )}
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const ReviewCard = ({ content, school, stars, datePosted, role, verified, username }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Box sx={{ my: 5 }}>
        <Paper sx={{ borderRadius: "0.5rem" }} elevation={5}>
          <Box
            sx={{
              background: `no-repeat center`,
              backgroundSize: "cover",
              height: "5rem",
              borderRadius: "0.5rem 0.5rem 0 0",
            }}
            className={"alt-school-banner"}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ mx: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  {school}
                </Typography>
                <Typography
                  sx={{
                    color: "grey",
                    fontSize: "1.25rem"
                  }}
                >
                  {datePosted}
                </Typography>
              </Box>
              <Rating value={stars} readOnly />
            </Box>
            <Typography sx={{ m: 1 }}>{content}</Typography>
          </Box>
          <IconButton sx={{ width: "100%", borderRadius: 0 }} onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>
        </Paper>
      </Box>
      {open && (<EditModal user={school} name={school} role={role}/>)}
      
    </>
  );
};

const SavedSchool = ({ schoolName }) => {
  return (
    <Box sx={{ my: { xs: 2 }, borderRadius: "1rem" }}>
      <Paper elevation={5} sx={{ borderRadius: "0.5rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              alignSelf: "center",
              ml: { xs: 2 },
              fontSize: { xs: "1.25rem", md: "1.75rem" },
            }}
          >
            {schoolName}
          </Typography>
          <Box
            sx={{
              height: "auto",
              width: { xs: "8rem", md: "12rem" },
            }}
          >
            <img
              src="https://i.insider.com/5cb4fb6faefeef24780d8ac5?width=600&format=jpeg&auto=webp"
              alt="school"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                borderTopRightRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};


const TabPanel = ({ value, index, children }) => {
  return value === index && children;
};

const colors = {
  white: "#f8fafc",
  black: "#0f172a",
};
