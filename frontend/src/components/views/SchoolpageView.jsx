import React from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  ListItemIcon,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  LocationOn,
  Phone,
  AccessTime,
  Fax,
  Email,
  Language,
  School,
} from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    getDoc,
    doc,
    updateDoc,
    onSnapshot,
    deleteDoc,
    arrayUnion
  } from "firebase/firestore";

import NavBar from "./NavBar";
import Iframe from "react-iframe";
import { MdOutlinePalette, MdOutlineHistoryEdu, MdOutlineQueryStats, MdOutlinePsychology, MdOutlineComputer, MdOutlineAccountBalance } from 'react-icons/md/index.js';
import { GiArchiveResearch, GiSpikedDragonHead, GiSpain, GiFrance, GiItalia, GiJapan, GiBookPile, GiGears, GiMusicalScore, GiIonicColumn, GiClayBrick, GiPaintBrush, GiBlackBook, GiQuillInk, GiEarthAmerica, GiCastle, GiUsaFlag } from 'react-icons/gi/index.js';
import { SlGraduation, SlCalculator } from 'react-icons/sl/index.js';
import { BiDna, BiAtom, BiMagnet } from 'react-icons/bi/index.js';
import { TbMathFunction, TbMap2 } from 'react-icons/tb/index.js';
import { HiCodeBracket, HiBeaker, HiOutlineCurrencyDollar } from 'react-icons/hi2/index.js';
import { RiGovernmentLine } from 'react-icons/ri/index.js';
import { FaMoneyBillWave, FaPiedPiperHat } from 'react-icons/fa/index.js';
import { SiMoleculer } from 'react-icons/si/index.js';
import { GoComment } from 'react-icons/go/index.js';

import HorizontalScoreBar from "../HorizontalScoreBar";
import { Table, TableBody} from '@mui/material';

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  const latitude = Number(school?.latitude);
  const longitude = Number(school?.longitude);
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik&marker=${latitude},${longitude}`;

  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");
  const [savedSchools, setSavedSchools] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [testScores, setTestScores] = React.useState([]);

  React.useEffect(() => {
    const schoolDbn = school?.dbn;
    if (schoolDbn) {
      const url = `https://data.cityofnewyork.us/resource/2h3w-9uj9.json?school_dbn=${schoolDbn}&year=2019`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setTestScores(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  }, [school]);
  
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
        })

      } else {
        console.log("not logged in");
      }
    });
  }, []);

  const urlFix = (schoolUrl) => {
    let fixedUrl = schoolUrl
      .split("http://")
      .at(-1)
      .split("https://")
      .at(-1)
      .toLowerCase();
    if (!fixedUrl.startsWith("www.")) {
      fixedUrl = `www.${fixedUrl}`;
    }
    return fixedUrl;
  };

  const splittingByComma = (str) => {
    return str ? str.split(",") : [];
  };

  const apClasses = splittingByComma(school?.advancedplacement_courses);
  const langClasses = splittingByComma(school?.language_classes);

  const iconsForAP = {
    "AP Art History": GiPaintBrush,
    "AP Biology": BiDna,
    "AP Calculus AB": SlCalculator,
    "AP Calculus BC": TbMathFunction,
    "AP Chemistry": HiBeaker,
    "AP Chinese Language and Culture": GiSpikedDragonHead,
    "AP Computer Science A": HiCodeBracket,
    "AP Computer Science Principles": MdOutlineComputer,
    "AP English Language and Composition": GiQuillInk,
    "AP English Literature and Composition": GiBlackBook,
    "AP Environmental Science": GiEarthAmerica,
    "AP European History": GiCastle,
    "AP French Language and Culture": GiFrance,
    "AP German Language and Culture": FaPiedPiperHat,
    "AP Comparative Government and Politics": RiGovernmentLine,
    "AP U.S. Government and Politics": MdOutlineAccountBalance,
    "AP Human Geography": TbMap2,
    "AP Italian Language and Culture": GiItalia,
    "AP Japanese Language and Culture": GiJapan,
    "AP Latin": GiIonicColumn,
    "AP Macroeconomics": FaMoneyBillWave,
    "AP Microeconomics": HiOutlineCurrencyDollar,
    "AP Music Theory": GiMusicalScore,
    "AP Physics 1": BiAtom,
    "AP Physics 2": SiMoleculer,
    "AP Physics C: Electricity and Magnetism": BiMagnet,
    "AP Physics C: Mechanics": GiGears,
    "AP Psychology": MdOutlinePsychology,
    "AP Spanish Language and Culture": GiSpain,
    "AP Spanish Literature and Culture": GiBookPile,
    "AP Statistics": MdOutlineQueryStats,
    "AP United States History": GiUsaFlag,
    "AP World History: Modern": MdOutlineHistoryEdu,
    "AP Research": GiArchiveResearch,
    "AP Seminar": SlGraduation,
    "AP 2-D Art and Design": MdOutlinePalette,
    "AP 3-D Art and Design": GiClayBrick,
  };

  const iconsForLang = {
    'Arabic': 'AR',
    'Bengali': 'BN',
    'Spanish': 'ES',
    'French': 'FR',
    'Italian': 'IT',
    'German': 'DE',
    'Japanese': 'JA',
    'Latin': 'LA',
    'Mandarin': 'ZH',
    'Korean': 'KO',
    'American Sign Language': 'ASL',
    'Greek': 'EL',
    'Hebrew': 'IW',
    'Hindi': 'HI',
    'Haitian Creole': 'HT',
    'Polish': 'PL',
    'Portuguese': 'PT',
    'Punjabi': 'PA',
    'Russian': 'RU',
    'Urdu': 'UR'
  };

  const getAPclassesIcon = (course) => {
    const Icon = iconsForAP[course.trim()] || School;
    return Icon;
  };

  const getLangclassesIcon = (course) => {
    return iconsForLang[course.trim()] || "LN";
  };

  const [showAllAPs, setShowAllAps] = useState(false);
  const visibleAPs = showAllAPs ? apClasses : apClasses.slice(0, 5);

  const CommentIcon = ({ languageAbbreviation }) => (
    <div style={{ position: "relative", top: "7px" }}>
      <GoComment size={28} />
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          textAlign: "center",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {languageAbbreviation}
      </div>
    </div>
  );

  const handleContactInfoClick = () => {
    const contactInfo = document.getElementById('schedule-contact-info');
    contactInfo.scrollIntoView({ behavior: 'smooth' });
  }

  const handleAddressClick = () => {
    const address = document.getElementById('navigation');
    address.scrollIntoView({ behavior: 'smooth' });
  }

  const handleOverviewClick = () => {
    const overview = document.getElementById('overview');
    overview.scrollIntoView({ behavior: 'smooth' });
  }

  const handleOpportunitiesClick = () => {
    const opportunities = document.getElementById('aca-opportunities');
    opportunities.scrollIntoView({ behavior: 'smooth' });
  }

  const handleAPCoursesClick = () => {
    const apCourses = document.getElementById('aca-apCourses');
    apCourses.scrollIntoView({ behavior: 'smooth' });
  }

  const handleLanguageClick = () => {
    const languageCourses = document.getElementById('aca-languages');
    languageCourses.scrollIntoView({ behavior: 'smooth' });
  }

  const handleProgramsClick = () => {
    const programs = document.getElementById('aca-programs');
    programs.scrollIntoView({ behavior: 'smooth' });
  }

  const handleTestScoresClick = () => {
    const programs = document.getElementById('aca-testscores');
    programs.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSave = () => {
    if (auth.currentUser != null || undefined) {
      if(!savedSchools.includes(school.school_name)) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        return updateDoc(docRef, {
          saved_schools: arrayUnion(school.school_name),
        });
      }
      else {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const removedSchool = savedSchools.filter(
          remove => remove !== school.school_name
        )
        return updateDoc(docRef, {
          saved_schools: removedSchool
        })
      }
    } else {
      console.log("you are not logged in!");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("signed out");
    });
  };

  window.addEventListener('scroll', function () {
    const headerHeight = document.getElementById('header-container').offsetHeight;
    const subheaderHeight = document.getElementById('subheader-container').offsetHeight;
    const totalHeaderHeight = headerHeight + subheaderHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > totalHeaderHeight + 10) {
      document.querySelector('.left-container').classList.add('fixed-left-container');
    } else {
      document.querySelector('.left-container').classList.remove('fixed-left-container');
    }
  });
  

  const algebraRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Common Core Algebra" &&
      
      score.category === "English Proficient";
  });
  const algebraMeanScore = algebraRegentsScores[0]?.mean_score;
 
  const algebra2RegentsScores = testScores.filter(score => {
    return score.regents_exam === "Common Core Algebra2" &&
      score.category === "English Proficient";
  });
  const algebra2MeanScore = algebra2RegentsScores[0]?.mean_score;

  const englishRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Common Core English" &&
      score.category === "English Proficient";
  });
  const englishMeanScore = englishRegentsScores[0]?.mean_score;

  const geometryRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Common Core Geometry" &&
      score.category === "English Proficient";
  });
  const geometryMeanScore = geometryRegentsScores[0]?.mean_score;

  const globalhistoryRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Global History and Geography" &&
      score.category === "English Proficient";
  });
  const globalhistoryMeanScore = globalhistoryRegentsScores[0]?.mean_score;

  const livingEnvironRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Living Environment" &&
      score.category === "English Proficient";
  });
  const livingEnvironMeanScore = livingEnvironRegentsScores[0]?.mean_score;

  const chemistryRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Physical Settings/Chemistry" &&
      score.category === "English Proficient";
  });
  const chemistryMeanScore = chemistryRegentsScores[0]?.mean_score;

  const earthScienceRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Physical Settings/Earth Science" &&
      score.category === "English Proficient";
  });
  const earthScienceMeanScore = earthScienceRegentsScores[0]?.mean_score;

  const physicsRegentsScores = testScores.filter(score => {
    return score.regents_exam === "Physical Settings/Physics" &&
      score.category === "English Proficient";
  });
  const physicsMeanScore = physicsRegentsScores[0]?.mean_score;

  const USHistoryRegentsScores = testScores.filter(score => {
    return score.regents_exam === "U.S. History and Government" &&
      score.category === "English Proficient";
  });
  const USHistoryMeanScore = USHistoryRegentsScores[0]?.mean_score;

  return (
    <>
      <NavBar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} id="header-container">
{/*MAIN HEADER*/}
          <Box sx={{ bgcolor: '#194973', py: 3.5 }}>
            <Typography
              variant="h4"
              component="h1"
              color="common.white"
              align="left"
              className="schoolpage-header"
            >
              {school?.school_name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              color="common.white"
              align="left"
              sx={{
                marginLeft: "1in",
                fontFamily: "Arial",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
              className="schoolpage-subtitle"
            >
              <Button className="address-button" onClick={handleAddressClick}>
                <Box
                  component="span"
                  sx={{
                    marginLeft: -1,
                    verticalAlign: 'middle',
                    fontFamily: 'Arial',
                    marginRight: 1,
                    fontSize: 30,
                    color: 'common.white',
                  }}
                >
                  <LocationOn />
                </Box>
                <span>{school?.location.split('(')[0].trim()}</span>
              </Button>
              <Button className="contact-info-button" onClick={handleContactInfoClick}>
                <Box
                  component="span"
                  sx={{
                    verticalAlign: 'middle',
                    marginLeft: '1em',
                    fontFamily: 'Arial',
                    fontSize: 30,
                    color: 'common.white',
                  }}
                >
                  <Phone />
                </Box>
                <span style={{ marginLeft: '0.4em' }}>Contact Info</span>
              </Button>
            </Typography>
          </Box>
{/*SUB HEADER*/}
          <Box sx={{ bgcolor: '#255478', py: 1.3 }} id="subheader-container">
            <Typography
              variant="subtitle2"
              component="div"
              align="left"
              sx={{
                marginLeft: "1in",
                fontFamily: "Arial",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
              className="schoolpage-subtitle"
            >
              <span>
                District:{" "}
                <strong style={{ color: "white" }}>
                  #{school?.dbn.slice(0, 2)}
                </strong>
              </span>
              <span style={{ marginLeft: "6em" }}>
                <strong style={{ color: "white" }}>
                  {school?.total_students}
                </strong>{" "}
                Students
              </span>
              <span style={{ marginLeft: "6em" }}>
                Grades{" "}
                <strong style={{ color: "white" }}>
                  {school?.finalgrades.slice(0, 1)}-
                  {school?.finalgrades.slice(2 - 4)}
                </strong>
              </span>
            </Typography>
          </Box>
        </Grid>
{/*LEFT CONTAINER*/}
        <Grid item xs={12} sm={12} md={2}>
          <Box className="left-container">
            <Typography variant="h6" sx={{ mb: 2 }}>
              School Profile
            </Typography>
            <List sx={{ mb: 3 }}>
              <ListItemButton sx={{ pl: 0 }} onClick={handleOverviewClick}>
                Overview
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleContactInfoClick}>
                Schedule and Contact
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleAddressClick}>
                Navigation
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Academics
            </Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }} onClick={handleOpportunitiesClick}>
                Academic Opportunities
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleAPCoursesClick}>
                AP Courses
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleLanguageClick}>
                Language Courses
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleProgramsClick}>
                Programs Offered
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleTestScoresClick}>
                Test Scores
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Support</Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }} onClick={handleOpportunitiesClick}>
                data 1
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleAPCoursesClick}>
                data 2
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleLanguageClick}>
                data 3
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Extracurricular Activities</Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>Student Outcomes</Typography>
          </Box>
        </Grid>
{/*MIDDLE CONTAINER*/}
        <Grid item xs={12} sm={12} md={8}>
          <Box className="middle-container-wrapper">
{/*SCHOOL PROFILE*/}
{/*Overview*/}
            <Box id="overview" className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Overview</h2>
              <p>{school?.overview_paragraph}</p>
            </Box>
{/*Schedule and Contact*/}
            <Box id="schedule-contact-info" className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Schedule and Contact Information</h2>
              <h4>Campus Address</h4>
              <ListItem>
                <p>{school?.location.split("(")[0].trim()}</p>
              </ListItem>
              {school?.campus_name && (
                <div>
                  <h4>Located at</h4>
                  <ListItem>
                    <p>{school?.campus_name}</p>
                  </ListItem>
                </div>
              )}
              <h4>Start and End Time</h4>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem>
                  <AccessTime sx={{ fontSize: "1.5rem", pr: "15px" }} />
                  <p>
                    {school?.start_time} - {school?.end_time}
                  </p>
                </ListItem>
              </Box>
              <h4>Contact Info & School Website</h4>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <ListItem>
                    <a
                      href={`tel:${school?.phone_number}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#16A1DD",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      <Phone sx={{ fontSize: "1.5rem", pr: "15px" }} />
                      {school?.phone_number}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a
                      href={`fax:${school?.fax_number}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#16A1DD",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      <Fax sx={{ fontSize: "1.5rem", pr: "15px" }} />
                      {school?.fax_number}
                    </a>
                  </ListItem>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <ListItem>
                    <a
                      href={`https://${urlFix(school?.website)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#16A1DD",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      <Language sx={{ fontSize: "1.5rem", pr: "15px" }} />
                      School's Website
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`mailto:${school?.school_email}`} style={{ display: 'flex', alignItems: 'center', color: '#16A1DD', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Email sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      School's Email
                    </a>
                  </ListItem>
                </Box>
              </Box>
            </Box>
{/*Navigation*/}
            <Box id="navigation" className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Navigation</h2>
              <h4>Nearby Transportation</h4>
              <List>
                {school?.subway && school?.subway !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">
                      Subway: {school?.subway}
                    </Typography>
                  </ListItem>
                )}
                {school?.bus && school.bus !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Bus: {school?.bus}</Typography>
                  </ListItem>
                )}
              </List>
              <Link
                to={`/map/${encodeURIComponent(school.school_name)}`}
                state={{ latitude, longitude, school }}
                style={{ color: "#16A1DD" }}
              >
                <h4>Click here for more map and direction information</h4>
              </Link>
              <div className="map-wrapper">
                <Iframe
                  url={url}
                  className="map-iframe"
                  width="80%"
                  height="400"
                  frameborder="0"
                  scrolling="no"
                />
              </div>
            </Box>
  {/*ACADEMICS*/}
  {/*Academic Opportunities*/}
            <Box id="aca-opportunities" className="middle-container academics">
              <h3>Academics</h3>
              <h2>Academic Opportunities</h2>
              <List>
                {school?.academicopportunities1 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities1}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
                {school?.academicopportunities2 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities2}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
                {school?.academicopportunities3 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities3}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
                {school?.academicopportunities4 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities4}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
                {school?.academicopportunities5 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities5}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
                {school?.academicopportunities6 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText
                      primary={school?.academicopportunities6}
                      className="academic-list-items-text"
                    />
                  </ListItem>
                )}
              </List>
            </Box>
{/*AP Courses*/}
            <Box id="aca-apCourses" className="middle-container academics">
              <h3>Academics</h3>
              <h2>Advanced Placement (AP) Courses</h2>
              <List>
                {visibleAPs.map((course) => (
                  <ListItem key={course}>
                    <ListItemIcon>
                      {React.createElement(getAPclassesIcon(course))}
                    </ListItemIcon>
                    <ListItemText primary={course.trim()} />
                  </ListItem>
                ))}
              </List>
              {!showAllAPs && apClasses.length > 5 && (
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="outlined"
                    onClick={() => setShowAllAps(true)}
                    color="primary"
                    style={{ color: "#16A1DD", borderColor: "#16A1DD" }}
                  >
                    Show all {apClasses.length} AP Courses
                  </Button>
                </Box>
              )}
            </Box>
{/*Language Courses*/}
            <Box id="aca-languages" className="middle-container academics">
              <h3>Academics</h3>
              <h2>Language Courses</h2>
              <Grid container spacing={2}>
                {langClasses.map((course) => (
                  <Grid key={course} item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      <ListItemIcon>
                        <CommentIcon
                          languageAbbreviation={getLangclassesIcon(course)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={course.trim()} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
{/*Programs Offered*/}
            <Box id="aca-programs" className="middle-container academics">
              <h3>Academics</h3>
              <h2>Programs/Concentrations Offered</h2>
              <List>
                {school.program1 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program1}
                    secondary={school.prgdesc1}
                  />
                )}
                {school.program2 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program2}
                    secondary={school.prgdesc2}
                  />
                )}
                {school.program3 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program3}
                    secondary={school.prgdesc3}
                  />
                )}
                {school.program4 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program4}
                    secondary={school.prgdesc4}
                  />
                )}
                {school.program5 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program5}
                    secondary={school.prgdesc5}
                  />
                )}
                {school.program6 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program6}
                    secondary={school.prgdesc6}
                  />
                )}
                {school.program7 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program7}
                    secondary={school.prgdesc7}
                  />
                )}
                {school.program8 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program8}
                    secondary={school.prgdesc8}
                  />
                )}
                {school.program9 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program9}
                    secondary={school.prgdesc9}
                  />
                )}
                {school.program10 && (
                  <ListItemText
                    className="program-list-item"
                    primary={school.program10}
                    secondary={school.prgdesc10}
                  />
                )}
              </List>
            </Box>
            {/*Test Scores*/}
            <Box id="aca-testscores" className="middle-container academics">
              <h3>Academics</h3>
              <h2>Test Scores</h2>
              <h4>Regents Exams</h4>
              <Box sx={{ width: "100%" }}>
                <Table>
                  <TableBody>
                    <HorizontalScoreBar examName="Algebra I" value={Math.round(algebraMeanScore)} />
                    <HorizontalScoreBar examName="Algebra II" value={Math.round(algebra2MeanScore)} />
                    <HorizontalScoreBar examName="Geometry" value={Math.round(geometryMeanScore)} />
                    <HorizontalScoreBar examName="English" value={Math.round(englishMeanScore)} />
                    <HorizontalScoreBar examName="Global History" value={Math.round(globalhistoryMeanScore)} />
                    <HorizontalScoreBar examName="U.S. History" value={Math.round(USHistoryMeanScore)} />
                    <HorizontalScoreBar examName="Living Environment" value={Math.round(livingEnvironMeanScore)} />
                    <HorizontalScoreBar examName="Earth Science" value={Math.round(earthScienceMeanScore)} />
                    <HorizontalScoreBar examName="Chemistry" value={Math.round(chemistryMeanScore)} />
                    <HorizontalScoreBar examName="Physics" value={Math.round(physicsMeanScore)} />
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Tooltip title="Save School">
          <IconButton sx={{
            position: "fixed",
            bottom: 0,
            right: 0,
            backgroundColor: "#f1f1f1", 
            borderRadius: "50%", 
            m: 5,
            p: 1.3, 
            "&:hover": { backgroundColor: "white" },
          }} 
          onClick={() => handleSave()}>
            {savedSchools.includes(school.school_name) ? <BookmarkIcon sx={{color: "#2196f3", fontSize: "2.3rem"}}/> : <BookmarkBorderIcon sx={{fontSize: "2.3rem"}}/>}
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
}

export default SchoolpageView;
