import {
  Box,
  IconButton,
  Paper,
  Rating,
  Tab,
  Tabs,
  Typography,
  Grid
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, updateDoc, FieldValue, deleteDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../config/firebase";
import Avatar from "@mui/material/Avatar";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

import EditModal from '../EditModal'

import Navbar from "./NavBar";

export default function ProfileView() {
  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");
  const [savedSchools, setSavedSchools] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [value, setValue] = React.useState(0)
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = auth.currentUser.uid;
        user ? setLoggedIn(true) : setLoggedIn(false);

        const docRef = doc(db, "users", uid);

        onSnapshot(docRef, (docSnap) => {
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

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("signed out");
    });
  };

  const deleteReview = async (schoolName) => {
    try {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, 'users', uid);
        const snapSchool = doc(db, "school", schoolName, "reviews", uid);

        const querySnapshot = await getDoc(docRef);
        const schoolDoc = await getDoc(snapSchool);

        console.log(schoolDoc.data())

        if (querySnapshot.exists() && schoolDoc.exists()) {
          console.log(schoolDoc.data())
          const reviews = querySnapshot.data().reviews;
          const removedReview = reviews.filter(
            review => review.school !== schoolName
          )
          deleteDoc(snapSchool)
          updateDoc(docRef, {
            reviews: removedReview
          })
          
        }
      }
      else {
        console.log("error");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const removeSavedSchool = async (name) => {
    try {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, 'users', uid);

        const querySnapshot = await getDoc(docRef);

        if (querySnapshot.exists()) {
          const savedSchools = querySnapshot.data().saved_schools;
          const removedSchool = savedSchools.filter(
            school => school !== name
          )
          return updateDoc(docRef, {
            saved_schools: removedSchool
          })
        }
      }
      else {
        console.log("error");
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const goToSchoolOnMap = async(school) => {
    const response = await fetch(`https://data.cityofnewyork.us/resource/uq7m-95z8.json?school_name=${school}`);
    const data = await response.json();
    navigate(`/map/${school}`, {state: {school: data[0], latitude: Number(data[0].latitude), longitude: Number(data[0].longitude)}});
  }

  const ReviewCard = ({
    content,
    school,
    stars,
    datePosted,
  }) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Box sx={{ my: 5 }}>
          <Paper sx={{ borderRadius: "0.5rem", width: "40dvw" }} elevation={5}>
            <Box
              sx={{
                background: `no-repeat center`,
                backgroundSize: "cover",
                height: "9rem",
                borderRadius: "0.5rem 0.5rem 0 0",
              }}
              className={"alt-school-banner"}
            />
            <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
              <Box sx={{ mx: 1, }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                    }}
                    textOverflow="ellipsis"
                  >
                    {school}
                  </Typography>
                  <Typography
                    sx={{
                      color: "grey",
                      fontSize: "1.25rem",
                    }}
                  >
                    {datePosted}
                  </Typography>
                </Box>
                <Rating value={stars} readOnly />
              </Box>
              <Typography sx={{ m: 1 }}>{content}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", p: 1 }}>
              <IconButton sx={{ borderRadius: 0 }} onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ borderRadius: 0 }} onClick={() => deleteReview(school)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box> 
        {open && (<EditModal
          user={username}
          name={school}
          role={role}
          date={datePosted}
          onClose={() => setOpen(false)}
          rating={stars}
          currentReview={content}
          uid={auth.currentUser.uid}
        />)}
      </>
    );
  };

  const SavedSchool = ({ schoolName }) => {
    return (
      <Box sx={{ my: 5, borderRadius: "1rem" }}>
        <Paper elevation={5} sx={{ borderRadius: "0.5rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                alignSelf: "center",
                ml: { xs: 2 },
                fontSize: { xs: "1.25rem", md: "1.75rem" },
              }}
              textOverflow="ellipsis"
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
          <Box sx={{ display: "flex", flexDirection: "row", p: 1 }}>
            <IconButton sx={{ borderRadius: 0 }} onClick={() => goToSchoolOnMap(schoolName)}>
              <LocationOnIcon />
            </IconButton>
            <IconButton sx={{ borderRadius: 0 }} onClick={() => removeSavedSchool(schoolName)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <>
    <Navbar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: colors.darkBlue,
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
                <Grid container spacing={0}>
                  {reviews.length === 0 ? (
                    <Typography sx={{ color: colors.black }}>
                      You do not have any reviews.
                    </Typography>
                  ) : (
                    reviews.map((data) => (
                      <Grid item xs={6}>
                        <ReviewCard {...data} key={data.school} />
                      </Grid>
                    ))
                  )}
                </Grid>
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

const TabPanel = ({ value, index, children }) => {
  return value === index && children;
};

const colors = {
  white: "#f8fafc",
  black: "#0f172a",
  darkBlue: "#F8F9FA",
};
