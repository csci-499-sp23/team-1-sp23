import { Box, Typography, MenuItem, Menu } from "@mui/material";
import Button from "@mui/material/Button";

import LiveSearch from "../LiveSearch";
import AdvanceFilters from "../AdvanceFilters";

import { useNavigate } from 'react-router-dom';

import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import SchoolsData from "../../schoolData";

import Navbar from "./NavBar";

export default function HomepageView() {
  const Schools = SchoolsData();
  const navigate = useNavigate();
  const languageArr = [];
  const boysSportArr = [];
  const girlsSportArr = [];
  const coedSportArr = [];

  const apCourses = [
    "AP Art History",
    "AP Biology",
    "AP Calculus AB",
    "AP Calculus BC",
    "AP Chemistry",
    "AP Chinese Language and Culture",
    "AP Computer Science A",
    "AP Computer Science Principles",
    "AP English Language and Composition",
    "AP English Literature and Composition",
    "AP Environmental Science",
    "AP European History",
    "AP French Language and Culture",
    "AP German Language and Culture",
    "AP Comparative Government and Politics",
    "AP U.S. Government and Politics",
    "AP Human Geography",
    "AP Italian Language and Culture",
    "AP Japanese Language and Culture",
    "AP Latin",
    "AP Macroeconomics",
    "AP Microeconomics",
    "AP Music Theory",
    "AP Physics 1",
    "AP Physics 2",
    "AP Physics C: Electricity and Magnetism",
    "AP Physics C: Mechanics",
    "AP Psychology",
    "AP Spanish Language and Culture",
    "AP Spanish Literature and Culture",
    "AP Statistics",
    "AP United States History",
    "AP World History: Modern",
    "AP Research",
    "AP Seminar",
    "AP 2-D Art and Design",
    "AP 3-D Art and Design",
  ];

  const filteredArr = Schools.reduce((acc, current) => {
    const x = acc.find((item) => (item.language_classes === current.language_classes));
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  filteredArr.forEach(school => {
    if (school.language_classes != undefined) {
      const language = school.language_classes.trim().split(", ")
      language.forEach(language => {
        languageArr.push(language)
      })
    }
    languageArr.sort()
  })

  Schools.forEach(school => {
    if (school.psal_sports_boys != undefined) {
      const sport = school.psal_sports_boys.trim().split(", ")
      sport.forEach(language => {
        boysSportArr.push(language)
      })
    }
    if (school.psal_sports_girls != undefined) {
      const sport = school.psal_sports_girls.trim().split(", ")
      sport.forEach(language => {
        girlsSportArr.push(language)
      })
    }
    if (school.psal_sports_coed != undefined) {
      const sport = school.psal_sports_coed.trim().split(", ")
      sport.forEach(language => {
        coedSportArr.push(language)
      })
    }
    boysSportArr.sort()
    girlsSportArr.sort()
    coedSportArr.sort()
  })

  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("signed out");
    });
  };

  return (
    <>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Box className="home-banner">
        <Box sx={{ mt: { xs: "30%", sm: "15%" } }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "2.25rem",
              filter: "drop-shadow(1px 1px 5px black)",
            }}
          >
            The easiest way to find the NYC highschool suited for your needs.
          </Typography>
        </Box>
        <Box sx={{ mt: "5rem", width: "50%" }}>
          <LiveSearch />
        </Box>
        <div>
          <Button
            onClick={handleClickOpen}
            sx={{ mt: "3rem", padding: ".7rem" }}
            style={{ background: "#60a5fa", color: "white" }}
          >
            Advance Search
          </Button>
          {open && (<AdvanceFilters handleClose={() => setOpen(false)}/>)}
        </div>
      </Box>
    </>
  );
}
