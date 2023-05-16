import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { auth, db } from "../config/firebase";
import { doc, collection, updateDoc, onSnapshot } from "firebase/firestore";

import { IoLocationOutline } from "react-icons/io5/index.js";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function MapCard({
  school,
  loading,
  openCard,
  goToSchool,
  savedSchools,
  saveSchool,
}) {
  const [open, setOpen] = React.useState(false);
  const [stars, setStars] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSnackbarOpen = (bool) => {
    setOpen(bool);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const getReviews = () => {
    const schoolRef = collection(db, `school/${school.school_name}/reviews`);
    onSnapshot(schoolRef, (docSnap) => {
      const stars = [];
      docSnap.forEach((doc) => {
        if (doc.exists()) {
          stars.push(doc.data().stars);
        } else {
          console.log("No reviews yet");
          return null;
        }
      });
      setStars(stars);
    });
  };

  React.useEffect(() => {
    getReviews();
  }, []);

  const handleSave = (schoolName, e) => {
    e.stopPropagation();
    if (auth.currentUser) {
      if (!savedSchools.includes(schoolName)) {
        saveSchool(schoolName);
      } else {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const removedSchool = savedSchools.filter(
          (school) => school !== schoolName
        );
        return updateDoc(docRef, {
          saved_schools: removedSchool,
        });
      }
    } else {
      handleSnackbarOpen(true);
    }
  };

  const onClickEvent = () => {
    openCard(true, school);
    goToSchool(Number(school.longitude), Number(school.latitude), school);
    setSearchParams({
      school: school.school_name,
      latitude: Number(school.latitude),
      longitude: Number(school.longitude),
    });
  };

  if (loading) {
    console.log("loading");
  }

  return (
    <Card
      elevation={1}
      sx={{
        backgroundColor: "transparent",
        boxShadow:
          "0px 0.4px 0.5px hsl(0deg 0% 52% / 0.35),0px 1.7px 2.1px -0.6px hsl(0deg 0% 52% / 0.41), 0px 4px 4.9px -1.2px hsl(0deg 0% 52% / 0.47),0.1px 9.4px 11.5px -1.8px hsl(0deg 0% 52% / 0.53)",
        borderRadius: "13px",
        cursor: "pointer",
      }}
      onClick={() => onClickEvent()}
    >
      <CardMedia
        sx={{
          height: 180,
          borderTopLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
        image={`/school-images/${school.dbn}.png`}
        title={school.school_name}
      ></CardMedia>
      <CardContent sx={{ position: "relative" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" noWrap textOverflow="ellipsis">
            {school.school_name}
          </Typography>
          <IconButton
            size="sm"
            onClick={(e) => handleSave(school.school_name, e)}
            sx={{ zIndex: 6 }}
          >
            {savedSchools.includes(school.school_name) ? (
              <BookmarkIcon sx={{ color: "#2196f3" }} />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            opacity: "85%",
            ml: -0.25,
            mb: 1,
          }}
        >
          <IoLocationOutline />
          <Typography noWrap textOverflow="ellipsis" sx={{ ml: 0.5 }}>
            {school.neighborhood + ", "}
            {school.borough
              .toLowerCase()
              .split(" ")
              .map((word) => {
                if (word == "is") {
                  word += "land";
                  return word.replace(/[a-z]/, (l) => l.toUpperCase());
                } else {
                  return word.replace(/[a-z]/, (l) => l.toUpperCase());
                }
              })
              .join(" ")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 500,
            mt: 2,
            mb: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{ height: 30, overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to={`/school/${school.school_name}`}
              state={{ school: school }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography noWrap>Learn More</Typography>
            </Link>
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StarIcon sx={{ color: "#fcba03", mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {stars.length != 0
                ? stars.reduce((a, b) => a + b).toFixed(1) / stars.length
                : 0.0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        sx={{ zIndex: 10000 }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          You need to be logged in to do that!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default MapCard;
