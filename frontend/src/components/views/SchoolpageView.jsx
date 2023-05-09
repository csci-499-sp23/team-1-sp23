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
  Tooltip,
  Table, 
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import Chip from "@mui/material/Chip";
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


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
import { MdInfoOutline, MdOutlineAccessible, MdSportsScore, MdSportsRugby, MdCelebration, MdSportsGymnastics, MdOutlineSportsHandball, MdOutlinePalette, MdOutlineHistoryEdu, MdOutlineQueryStats, MdOutlinePsychology, MdOutlineComputer, MdOutlineAccountBalance } from 'react-icons/md/index.js';
import { GiJumpingRope, GiHighPunch, GiFencer, GiTennisRacket, GiCricketBat, GiSprint, GiMeshBall, GiRunningShoe, GiBaseballBat, GiArchiveResearch, GiSpikedDragonHead, GiSpain, GiFrance, GiItalia, GiJapan, GiBookPile, GiGears, GiMusicalScore, GiIonicColumn, GiClayBrick, GiPaintBrush, GiBlackBook, GiQuillInk, GiEarthAmerica, GiCastle, GiUsaFlag } from 'react-icons/gi/index.js';
import { SlGraduation, SlCalculator } from 'react-icons/sl/index.js';
import { BiDna, BiSwim, BiAtom, BiMagnet } from 'react-icons/bi/index.js';
import { TbMathFunction, TbMap2, TbBallVolleyball } from 'react-icons/tb/index.js';
import { HiCodeBracket, HiBeaker, HiOutlineCurrencyDollar } from 'react-icons/hi2/index.js';
import { RiGovernmentLine } from 'react-icons/ri/index.js';
import { FaMoneyBillWave, FaPiedPiperHat } from 'react-icons/fa/index.js';
import { SiMoleculer } from 'react-icons/si/index.js';
import { GoArrowUp, GoComment } from 'react-icons/go/index.js';
import { IoAmericanFootball, IoTennisballOutline, IoBaseballOutline, IoAmericanFootballOutline, IoFootballOutline,IoGolfOutline, IoBasketballOutline, IoBowlingBallOutline} from 'react-icons/io5/index.js'
import { FaArrowUp, FaMinusCircle, FaCheckCircle, FaExclamationTriangle, FaRunning, FaTableTennis } from 'react-icons/fa/index.js'


import HorizontalScoreBar from "../HorizontalScoreBar";
import DemographicCharts from "../DemographicCharts";
import QualityCharts from "../QualityCharts"
import hoverDescriptions  from "../hoverDescriptions";

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  const latitude = Number(school?.latitude);
  const longitude = Number(school?.longitude);
  const stats = true;
  const dbn = school.dbn;
  const schoolName = school?.school_name;
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik&marker=${latitude},${longitude}`;

  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");
  const [savedSchools, setSavedSchools] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [testScores, setTestScores] = React.useState([]);
  const [apScores, setAPScores] = React.useState([]);
  const [satScores, setSatScores] = React.useState([]);
  const [demographicInfo, setDemographInfo] = React.useState([]);
  const [qualityInfo, setQualityInfo] = React.useState([]);

  const [tab, setTab] = React.useState(0)

  {/*Regent Exams Data*/}
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

  {/*AP Exams Data*/}
  React.useEffect(() => {
    const schoolDbn = school?.dbn;
    if (schoolDbn) {
      const url = `https://data.cityofnewyork.us/resource/9ct9-prf9.json?dbn=${schoolDbn}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setAPScores(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  }, [school]);

  {/*SAT Data*/}
  React.useEffect(() => {
    const schoolDbn = school?.dbn;
    if (schoolDbn) {
      const url = `https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=${schoolDbn}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setSatScores(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  }, [school]);

  {/*Demographic Snapshot 2020-2021*/}
  React.useEffect(() => {
    const schoolDbn = school?.dbn;
    if (schoolDbn) {
      const url = `https://data.cityofnewyork.us/resource/vmmu-wj3w.json?dbn=${schoolDbn}&year=2020-21`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDemographInfo(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  }, [school]);

   {/*2017-2018 School Quality Report - High School*/}
   React.useEffect(() => {
    const schoolDbn = school?.dbn;
    if (schoolDbn) {
      const url = `https://data.cityofnewyork.us/resource/7c8x-xds8.json?dbn=${schoolDbn}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setQualityInfo(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
  }, [school]);
  
   {/*Login*/}
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

  const splittingBySemiColon = (str) => {
    return str ? str.split(";") : [];
  };

  const apClasses = splittingByComma(school?.advancedplacement_courses);
  const langClasses = splittingByComma(school?.language_classes);
  const extracurricularClubs = splittingByComma(school?.extracurricular_activities)
  const boysSports = splittingByComma(school?.psal_sports_boys)
  const girlsSports = splittingByComma(school?.psal_sports_girls)
  const coedSports = splittingByComma(school?.psal_sports_coed)


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

  const iconsForSports = {
    'Badminton': GiTennisRacket,
    'Baseball': IoBaseballOutline,
    'Basketball' : IoBasketballOutline,
    'Bowling' : IoBowlingBallOutline,
    'Cross Country': FaRunning, 
    'Cricket': GiCricketBat,
    'Fencing': GiFencer,
    'Flag Football': IoAmericanFootballOutline,
    'Football': IoAmericanFootball,
    'Golf': IoGolfOutline,
    'Gymnastics': MdSportsGymnastics,
    'Handball': MdOutlineSportsHandball,
    'Indoor Track': GiSprint,
    'Lacrosse': GiMeshBall,
    'Outdoor Track': GiRunningShoe,
    'Soccer': IoFootballOutline,
    'Softball': GiBaseballBat,
    'Stunt': MdCelebration,
    'Swimming': BiSwim,
    'Table Tennis': FaTableTennis,
    'Tennis': IoTennisballOutline,
    'Volleyball': TbBallVolleyball,
    'Wrestling': GiHighPunch, 
    'Rugby' : MdSportsRugby,
    'Double Dutch' : GiJumpingRope,
  }
  const getSportIcon = (sport) => {
    return iconsForSports[sport.trim()] || MdSportsScore;
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

  
  const [showAllClubs, setShowClubs] = useState(false);
  const visibleClubs = showAllClubs ? extracurricularClubs : extracurricularClubs.slice(0, 8);

  const CommentIcon =({ languageAbbreviation }) => (
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

  const handleClubsClick = () => {
    const clubs = document.getElementById('clubs');
    clubs.scrollIntoView({ behavior: 'smooth' });
  }
  const handleSportsClick = () => {
    const sports = document.getElementById('sports')
    sports.scrollIntoView({ behavior: 'smooth' });
  }

  const handleDemographicsClick = () => {
    const sports = document.getElementById('demographics')
    sports.scrollIntoView({ behavior: 'smooth' });
  }

  const handleQualityFeedbackClick = () => {
    const sports = document.getElementById('qualityFeedback')
    sports.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSupportServicesClick = () => {
    const sports = document.getElementById('supportservices')
    sports.scrollIntoView({ behavior: 'smooth' });
  }

  const handleTabChange = (e, value) => { 
    setTab(value)
  }

  const TabPanel = ({ children, value, index }) => {
    return value === index && children;
  };
  

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
      document.getElementById('scroll-to-top').classList.remove('hidden');
    } else {
      document.querySelector('.left-container').classList.remove('fixed-left-container');
      document.getElementById('scroll-to-top').classList.add('hidden');
    }
  });


  const isInternational = school?.international === "1"; 
  const isSpecialized = school?.specialized === "1"; 
  const isTransfer = school?.transfer === "1";
  const isPTech = school?.ptech === "1";
  const isEarlyCollege = school?.earlycollege === "1";

  const algebraRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Common Core Algebra" && score.category === "ELL";
    } else {
      return score.regents_exam === "Common Core Algebra" && score.category === "English Proficient";
    }
  });
  const algebraMeanScore = algebraRegentsScores[0]?.mean_score;
 
  const algebra2RegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Common Core Algebra2" && score.category === "ELL";
    } else {
      return score.regents_exam === "Common Core Algebra2" && score.category === "English Proficient";
    }
  });
  const algebra2MeanScore = algebra2RegentsScores[0]?.mean_score;

  const englishRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Common Core English" && score.category === "ELL";
    } else {
      return score.regents_exam === "Common Core English" && score.category === "English Proficient";
    }
  });
  const englishMeanScore = englishRegentsScores[0]?.mean_score;

  const geometryRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Common Core Geometry" && score.category === "ELL";
    } else {
      return score.regents_exam === "Common Core Geometry" && score.category === "English Proficient";
    }
  });
  const geometryMeanScore = geometryRegentsScores[0]?.mean_score;

  const globalhistoryRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Global History and Geography" && score.category === "ELL";
    } else {
      return score.regents_exam === "Global History and Geography" && score.category === "English Proficient";
    }
  });
  const globalhistoryMeanScore = globalhistoryRegentsScores[0]?.mean_score;

  const livingEnvironRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Living Environment" && score.category === "ELL";
    } else {
      return score.regents_exam === "Living Environment" && score.category === "English Proficient";
    }
  });
  const livingEnvironMeanScore = livingEnvironRegentsScores[0]?.mean_score;

  const chemistryRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Physical Settings/Chemistry" && score.category === "ELL";
    } else {
      return score.regents_exam === "Physical Settings/Chemistry" && score.category === "English Proficient";
    }
  });
  const chemistryMeanScore = chemistryRegentsScores[0]?.mean_score;

  const earthScienceRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Physical Settings/Earth Science" && score.category === "ELL";
    } else {
      return score.regents_exam === "Physical Settings/Earth Science" && score.category === "English Proficient";
    }
  });
  const earthScienceMeanScore = earthScienceRegentsScores[0]?.mean_score;

  const physicsRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Physical Settings/Physics" && score.category === "ELL";
    } else {
      return score.regents_exam === "Physical Settings/Physics" && score.category === "English Proficient";
    }
  });
  const physicsMeanScore = physicsRegentsScores[0]?.mean_score;

  const USHistoryRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "U.S. History and Government" && score.category === "ELL";
    } else {
      return score.regents_exam === "U.S. History and Government" && score.category === "English Proficient";
    }
  });
  const USHistoryMeanScore = USHistoryRegentsScores[0]?.mean_score;

  const spanishRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Spanish" && score.category === "ELL";
    } else {
      return score.regents_exam === "Spanish" && score.category === "English Proficient";
    }
  });
  const spanishMeanScore = spanishRegentsScores[0]?.mean_score;

  const frenchRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "French" && score.category === "ELL";
    } else {
      return score.regents_exam === "French" && score.category === "English Proficient";
    }
  });
  const frenchMeanScore = frenchRegentsScores[0]?.mean_score;

  const chineseRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Chinese" && score.category === "ELL";
    } else {
      return score.regents_exam === "Chinese" && score.category === "English Proficient";
    }
  });
  const chineseMeanScore = chineseRegentsScores[0]?.mean_score;

  const italianRegentsScores = testScores.filter(score => {
    if (isInternational) {
      return score.regents_exam === "Italian" && score.category === "ELL";
    } else {
      return score.regents_exam === "Italian" && score.category === "English Proficient";
    }
  });
  const italianMeanScore = italianRegentsScores[0]?.mean_score;
  
  const apExamsPassed = apScores[0]?.num_of_ap_exams_passed;
  const apTotalExams = apScores[0]?.num_of_ap_total_exams_taken;
  const apTestTakers = apScores[0]?.num_of_ap_test_takers;

  const apPassRate = Math.round((Number(apExamsPassed) / Number(apTotalExams)) * 100); 
  const apEnrollment = Math.round((Number(apTestTakers) / Number(school?.total_students)) * 100);

  const satCriticalReading = satScores[0]?.sat_critical_reading_avg_score;
  const satWriting = satScores[0]?.sat_writing_avg_score
  const satMath = satScores[0]?.sat_math_avg_score;
  
  const satNewReading = Math.round((Number(satCriticalReading) + Number(satWriting)) / 2);
  const satTotal = Math.round(satMath) + satNewReading;

  const satScoresAvailable = !(
    satCriticalReading === "s" &&
    satWriting === "s" &&
    satMath === "s"
  );

  const demographics = [
    {
      femalePercentage: demographicInfo[0]?.female_1,
      malePercentage: demographicInfo[0]?.male_1,
      asianPercentage: demographicInfo[0]?.asian_1,
      blackPercentage: demographicInfo[0]?.black_1,
      hispanicPercentage: demographicInfo[0]?.hispanic_1,
      whitePercentage: demographicInfo[0]?.white_1,
      nativeAmericanPercentage: demographicInfo[0]?.native_american_1,
      missingRacePercentage: demographicInfo[0]?.missing_race_ethnicity_data_1,
      multiRacePercentage: demographicInfo[0]?.multi_racial_1,
    }
  ]

  const accessibilityStatus = school?.school_accessibility;
  const ellPrograms = splittingBySemiColon(school?.ell_programs);
  const ellPercentage = Math.round(demographicInfo[0]?.english_language_learners_1 * 100);
  const povertyPercentage = demographicInfo[0]?.poverty_1;
  const economicNeedPercentage = demographicInfo[0]?.economic_need_index;

  const studentAttendance = formatValue((parseFloat(qualityInfo[0]?.student_attendance_rate) * 100).toFixed(1));
  const chronicAbsence = formatValue((parseFloat(qualityInfo[0]?.percent_of_students) * 100).toFixed(1));
  const teacherAttendance = formatValue((parseFloat(qualityInfo[0]?.teacher_attendance_rate) * 100).toFixed(1));

  const teacherExperience = formatValue((parseFloat(qualityInfo[0]?.percent_of_teachers_with) * 100).toFixed(1));
  const principalExperience = formatValue(Math.round(qualityInfo[0]?.years_of_principal_experience));

  const quality = [
    {
      rigorousInstruction: (parseFloat(qualityInfo[0]?.rigorous_instruction_percent) * 100).toFixed(1),
      collaborativeTeachers: (parseFloat(qualityInfo[0]?.collaborative_teachers_percent) * 100).toFixed(1),
      supportiveEnvironment: (parseFloat(qualityInfo[0]?.supportive_environment_percent) * 100).toFixed(1),
      effectiveLeadership: (parseFloat(qualityInfo[0]?.effective_school_leadership_1) * 100).toFixed(1),
      strongFamilyTies: (parseFloat(qualityInfo[0]?.strong_family_community_ties_1) * 100).toFixed(1),
      trustPercentage: (parseFloat(qualityInfo[0]?.trust_percent_positive) * 100).toFixed(1),
    }
  ]

  const iconsForAccessibility = {
    'Fully Accessible': () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MdOutlineAccessible style={{ color: 'blue', fontSize: '50px', marginRight: '5px' }} />
        <FaCheckCircle style={{ color: 'black', backgroundColor: '#00CC00', marginRight: '5px', padding: '5px', borderRadius: '50%' }} />
      </div>
    ),
    'Partially Accessible': () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MdOutlineAccessible style={{ color: 'blue', fontSize: '50px', marginRight: '5px' }} />
        <FaExclamationTriangle style={{ color: 'black', backgroundColor: 'yellow', padding: '5px', borderRadius: '50%' }} />
      </div>
    ),
    'Not Accessible': () => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MdOutlineAccessible style={{ color: 'blue', fontSize: '50px', marginRight: '5px' }} />
        <FaMinusCircle style={{ color: 'black', backgroundColor: 'red', padding: '5px', borderRadius: '50%' }} />
      </div>
    ),
  };

  const IconAccessibility = iconsForAccessibility[accessibilityStatus];

  const Label = ({ text, backcolor, color }) => {
    return (
      <Chip
        label={text}
        sx={{
          backgroundColor: backcolor,
          color: color,
          fontWeight: "bold",
          fontSize: "14px",
          borderRadius: "15px",
          border: `2.5px solid ${color}`,
          marginLeft: "0.5em",
        }}
      />
    );
  };

  return (
    <>
      <NavBar loggedIn={loggedIn} handleLogout={handleLogout}/>
      <Grid container sx={{width: "100%"}}>
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
              <span style={{ marginLeft: "6em" }}>
                {isSpecialized && (
                  <Label text="Specialized" backcolor="#DAFBE2" color="#177F3C" />
                )}
                {isInternational && (
                  <Label text="International" backcolor="#FBEFFE" color="#8655DC" />
                )}
                {isTransfer && (
                  <Label text="Transfer" backcolor="#FFF8C7" color="#9A6711" />
                )}
                {isPTech && (
                  <Label text="P-Tech" backcolor="#FFF1E5" color="#BD4C09" />
                )}
                {isEarlyCollege && (
                  <Label text="Early College" backcolor="#FFEFF7" color="#C03987" />
                )}
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
              <ListItemButton sx={{ pl: 0, marginBottom: "-20px" }} onClick={handleAddressClick}>
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
            <Typography variant="h6" sx={{ mb: 2 }}>Extracurricular Activities</Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }} onClick={handleClubsClick}>
                Clubs
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleSportsClick}>
                Sports
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Environment</Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }} onClick={handleDemographicsClick}>
                Student Demographics
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleQualityFeedbackClick}>
                Quality and Feedback
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }} onClick={handleSupportServicesClick}>
                Support Services
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Outcomes</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Reviews</Typography>

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
              <Link
                to={`/map/${encodeURIComponent(school.school_name)}`}
                state={{ latitude, longitude, school }}
                style={{color: "#16A1DD" }}
              >
                {school?.location.split("(")[0].trim()}
              </Link>
              <h4 style={{ paddingTop: "10px" }}>Nearby Transportation</h4>
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
              <Link
                to={`/map/${encodeURIComponent(school.school_name)}`}   
                state={{ latitude, longitude, school }}
                style={{ marginTop: "20px", color: "#16A1DD", textDecoration: "underline", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
              >
                <h4 style={{ marginRight: "0.5rem" }}>More Map and Direction Information here</h4>
                <ArrowForwardIosIcon style={{ fontSize: "0.9rem", marginLeft: "-0.5rem" }} />
              </Link>
            </Box>
{/*ACADEMICS*/}
{/*Academic Opportunities*/ }
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
                {langClasses.length !== 0 || undefined ? langClasses.map((course) => (
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
                )) : <Grid item xs={6} sm={12}>
                  <Typography >No langauge classes available</Typography>
                </Grid>}
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
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <h4>Regents Exams</h4>
                <Tooltip title={hoverDescriptions['RegentsDescrip'].description} arrow placement="right">
                  <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '8px' }}>
                    <MdInfoOutline />
                  </IconButton>
                </Tooltip>
              </div>
              <Box sx={{ width: "100%" }}>
                <Table>
                  <TableBody>
                    {algebraMeanScore && algebraMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Algebra I" value={Math.round(algebraMeanScore)} stateAverage={73} />
                    }
                    {algebra2MeanScore && algebra2MeanScore !== "s" &&
                      <HorizontalScoreBar examName="Algebra II" value={Math.round(algebra2MeanScore)} stateAverage={76} />
                    }
                    {geometryMeanScore && geometryMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Geometry" value={Math.round(geometryMeanScore)} stateAverage={73} />
                    }
                    {englishMeanScore && englishMeanScore !== "s" &&
                      <HorizontalScoreBar examName="English" value={Math.round(englishMeanScore)} stateAverage={77} />
                    }
                    {globalhistoryMeanScore && globalhistoryMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Global History" value={Math.round(globalhistoryMeanScore)} stateAverage={73} />
                    }
                    {USHistoryMeanScore && USHistoryMeanScore !== "s" &&
                      <HorizontalScoreBar examName="U.S. History" value={Math.round(USHistoryMeanScore)} stateAverage={78} />
                    }
                    {livingEnvironMeanScore && livingEnvironMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Living Environment" value={Math.round(livingEnvironMeanScore)} stateAverage={75} />
                    }
                    {earthScienceMeanScore && earthScienceMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Earth Science" value={Math.round(earthScienceMeanScore)} stateAverage={74} />
                    }
                    {chemistryMeanScore && chemistryMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Chemistry" value={Math.round(chemistryMeanScore)} stateAverage={73} />
                    }
                    {physicsMeanScore && physicsMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Physics" value={Math.round(physicsMeanScore)} stateAverage={78} />
                    }
                  </TableBody>
                </Table>
              </Box>
              {((spanishMeanScore && spanishMeanScore !== "s") ||
                (frenchMeanScore && frenchMeanScore !== "s") ||
                (italianMeanScore && italianMeanScore !== "s") ||
                (chineseMeanScore && chineseMeanScore !== "s")) && (
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4>Language (LOTE) Exams</h4>
                    <Tooltip title={hoverDescriptions['LOTEDescrip'].description} arrow placement="right">
                      <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '8px' }}>
                        <MdInfoOutline />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              <Box sx={{ width: "100%" }}>
                <Table>
                  <TableBody>
                    {spanishMeanScore && spanishMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Spanish" value={Math.round(spanishMeanScore)} />
                    }
                    {frenchMeanScore && frenchMeanScore !== "s" &&
                      <HorizontalScoreBar examName="French" value={Math.round(frenchMeanScore)} />
                    }
                    {italianMeanScore && italianMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Italian" value={Math.round(italianMeanScore)} />
                    }
                    {chineseMeanScore && chineseMeanScore !== "s" &&
                      <HorizontalScoreBar examName="Chinese" value={Math.round(chineseMeanScore)} />
                    }
                  </TableBody>
                </Table>
              </Box>
              {((apTestTakers && apTestTakers !== "s") ||
                (apExamsPassed && apExamsPassed !== "s") ||
                (apTotalExams && apTotalExams !== "s")) && (
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4>Advanced Placement Exams</h4>
                    <Tooltip title={hoverDescriptions['APDescrip'].description} arrow placement="right">
                      <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '8px' }}>
                        <MdInfoOutline />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              <Table>
                {apExamsPassed && apExamsPassed !== "s" && apTotalExams && apTotalExams !== "s" && (
                  <TableCell sx={{ border: 'none' }}>
                    <Typography variant="body1">AP Exam Pass Rate</Typography>
                    <Typography variant="h2">{apPassRate}%</Typography>
                  </TableCell>
                )}
                {apTestTakers && apTestTakers !== "s" && (
                  <TableCell sx={{ border: 'none' }}>
                    <Typography variant="body1">AP Exam Enrollment</Typography>
                    <Typography variant="h2">~{apEnrollment}%</Typography>
                  </TableCell>
                )}
              </Table>
              {satScoresAvailable && satCriticalReading != null && satWriting != null && satMath != null && (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <h4>SAT Scores</h4>
                    <Tooltip title={hoverDescriptions['SATDescrip'].description} arrow placement="right">
                      <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '8px' }}>
                        <MdInfoOutline />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Table>
                    <TableRow>
                      <TableCell sx={{ border: 'none' }}>
                        <Typography variant="body1">Average SAT</Typography>
                        <Typography variant="h2">{satTotal}</Typography>
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <Typography variant="body1">Math</Typography>
                        <Typography variant="h2">{satMath}</Typography>
                      </TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <Typography variant="body1">Verbal</Typography>
                        <Typography variant="h2">{satNewReading}</Typography>
                      </TableCell>
                    </TableRow>
                  </Table>
                </div>
              )}
              <Link
                to={`/map/${encodeURIComponent(school.school_name)}`}
                state={{ latitude, longitude, school, dbn, schoolName, stats }}
                style={{ color: "#16A1DD", textDecoration: "underline", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
              >
                <h4 style={{ marginRight: "0.5rem" }}>More about {school?.school_name}'s Test Scores</h4>
                <ArrowForwardIosIcon style={{ fontSize: "0.9rem", marginLeft: "-0.5rem" }} />
              </Link>
            </Box>
{/*EXTRACURRICULAR ACTIVITIES*/}
{/*Clubs*/}
            <Box id="clubs" className="middle-container academics">
              <h3>Extracurricular Activities</h3>
              <h2>Clubs</h2>
              <Grid container spacing={2}>
                {visibleClubs.length !== 0 ? visibleClubs.map((club) => (<Grid key={club} item xs={6} sm={3}>
                  <Box display="flex" alignItems="center">
                    <ListItemText primary={club.trim()} />
                  </Box>
                </Grid>)) :
                  <Grid item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      <ListItemText primary="No clubs available" />
                    </Box></Grid>}
              </Grid>
              {(!showAllClubs && extracurricularClubs.length > 8) && (
                <Box display="flex" justifyContent="center" sx={{ m: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setShowClubs(true)}
                    color="primary"
                    style={{ color: "#16A1DD", borderColor: "#16A1DD", margin: 1 }}
                  >
                    Show all {extracurricularClubs.length} Clubs
                  </Button>
                </Box>
              )}
            </Box>
{/*Sports*/}
            <Box id="sports" className="middle-container academics">
              <h3>Extracurricular Activities</h3>
              <h2>Sports</h2>

              <Tabs
                sx={{ alignSelf: "center", mb: 2 }}
                value={tab}
                onChange={handleTabChange}
              >
                <Tab sx={{ fontWeight: "500", mr: 2 }} label="Girls" />
                <Tab sx={{ fontWeight: "500", mx: 2 }} label="Coed" />
                <Tab sx={{ fontWeight: "500", ml: 2 }} label="Boys" />
              </Tabs>
              <TabPanel
                value={0}
                index={tab}
              >
                <Grid container spacing={2}>
                  {girlsSports.length !== 0 ? girlsSports.map((sport) => (<Grid key={sport} item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      {React.createElement(getSportIcon(sport))}
                      <ListItemText sx={{ ml: 1 }} primary={sport.trim()} />
                    </Box>
                  </Grid>)) :
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <ListItemText primary="No girls sports available" />
                      </Box>
                    </Grid>}
                </Grid>
              </TabPanel>
              <TabPanel
                value={1}
                index={tab}
              >
                <Grid container spacing={2}>
                  {coedSports.length !== 0 ? coedSports.map((sport) => (<Grid key={sport} item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      {React.createElement(getSportIcon(sport))}
                      <ListItemText sx={{ ml: 1 }} primary={sport.trim()} />
                    </Box>
                  </Grid>)) :
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <ListItemText primary="No coed sports available" />
                      </Box>
                    </Grid>}
                </Grid>
              </TabPanel>
              <TabPanel
                value={2}
                index={tab}
              >
                <Grid container spacing={2}>
                  {boysSports.length !== 0 ? boysSports.map((sport) => (<Grid key={sport} item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      {React.createElement(getSportIcon(sport))}
                      <ListItemText sx={{ ml: 1 }} primary={sport.trim()} />
                    </Box>
                  </Grid>)) :
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <ListItemText primary="No boys sports available" />
                      </Box>
                    </Grid>}
                </Grid>
              </TabPanel>
            </Box>
{/*ENVIRONMENT*/}
{/*Student Demographics*/}
            <Box id="demographics" className="middle-container academics">
              <h3>Environment</h3>
              <h2>Student Demographics</h2>
              <h4>Student Diversity</h4>
              <DemographicCharts demographics={demographics} />
            </Box>
{/*Quality and Feedback */}
            <Box id="qualityFeedback" className="middle-container academics">
              <h3>Environment</h3>
              <h2>Quality and Feedback</h2>
              <h4>Attendance</h4>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {studentAttendance && (
                      <TableRow>
                        <TableCell>Student Attendance</TableCell>
                        <TableCell align="right">{studentAttendance}%</TableCell>
                      </TableRow>
                    )}
                    {chronicAbsence && (
                      <TableRow>
                        <TableCell>Percentage of Students Chronically Absent</TableCell>
                        <TableCell align="right">{chronicAbsence}%</TableCell>
                      </TableRow>
                    )}
                    {teacherAttendance && (
                      <TableRow>
                        <TableCell>Teacher Attendance</TableCell>
                        <TableCell align="right">{teacherAttendance}%</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4 style={{ marginTop: "10px" }}>Experience</h4>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {teacherExperience && (
                      <TableRow>
                        <TableCell>Percent of Teachers with 3 or More Years of Experience</TableCell>
                        <TableCell align="right">{teacherExperience}%</TableCell>
                      </TableRow>
                    )}
                    {principalExperience && (
                      <TableRow>
                        <TableCell>Principal's Years of Experience</TableCell>
                        <TableCell align="right">~{principalExperience} years</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4 style={{marginTop: "10px"}}>School-wide survey of Teachers, Students, & Parents</h4>
              <QualityCharts quality={quality} />
            </Box>
{/*Support Services*/}
            <Box id="supportservices" className="middle-container academics">
              <h3>Environment</h3>
              <h2>Support Services</h2>
              <div>
                <h4>English Language Learners</h4>
                <Table>
                  <TableCell sx={{ border: 'none', display: 'relative', alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Typography variant="body1">ELL Programs</Typography>
                      <Tooltip title={hoverDescriptions['ELLPrograms'].description} arrow placement="right">
                        <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '12px' }}>
                          <MdInfoOutline />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1rem' }}>
                      {ellPrograms.map((program) => (
                        <li key={program}>{program}</li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell sx={{ border: 'none', display: 'relative', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1">ELL Students</Typography>
                    <Typography variant="h2">{`${ellPercentage}%`}</Typography>
                  </TableCell>
                </Table>

                <h4>Economic Indices</h4>
                <Table>
                  <TableCell sx={{ border: 'none', display: 'relative', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Typography variant="body1">Eligible for Free/Reduced Lunch Program</Typography>
                      <Tooltip title={hoverDescriptions['FreeReducedLunch'].description} arrow placement="top">
                        <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '12px' }}>
                          <MdInfoOutline />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Typography variant="h2">{povertyPercentage}</Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', display: 'relative', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <Typography variant="body1">Economic Need Index</Typography>
                      <Tooltip title={hoverDescriptions['economicIndex'].description} arrow placement="top">
                        <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '12px' }}>
                          <MdInfoOutline />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Typography variant="h2">{economicNeedPercentage}</Typography>
                  </TableCell>
                </Table>

                <h4>Accessibility</h4>
                <TableCell sx={{ border: 'none', height: '100px', display: 'relative', alignItems: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <Typography variant="body1" >
                      {accessibilityStatus}
                    </Typography>
                    <Tooltip title={hoverDescriptions[accessibilityStatus].description} arrow placement="right">
                      <IconButton className="info-icon" style={{ marginLeft: '-2px', paddingBottom: '12px' }}>
                        <MdInfoOutline />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <IconAccessibility style={{ fontSize: '3rem', position: 'absolute', bottom: 0 }} />
                </TableCell>
              </div>
            </Box>

          </Box>
        </Grid>
{/*Scroll Up Button*/}
        <IconButton
          id="scroll-to-top"
          className="hidden"
          sx={{
            position: "fixed",
            right: "0%",
            backgroundColor: "#f1f1f1",
            m: 1,
            p: 1,
            "&:hover": { backgroundColor: "white" },
          }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FaArrowUp size={28} style={{ marginLeft: '-1px' }} />
          <Typography sx={{ display: "inline-block", ml: 1, fontSize: 16, marginLeft: '4px' }}>
            Top
          </Typography>
        </IconButton>
{/*Save School Button*/}
        <Tooltip title="Save School">
          <IconButton sx={{
            position: "fixed",
            bottom: -25,
            right: -25,
            backgroundColor: "#f1f1f1",
            borderRadius: "50%",
            m: 5,
            p: 1.3,
            "&:hover": { backgroundColor: "white" },
          }}
            onClick={() => handleSave()}>
            {savedSchools.includes(school.school_name) ? <BookmarkIcon sx={{ color: "#2196f3", fontSize: "2.3rem" }} /> : <BookmarkBorderIcon sx={{ fontSize: "2.3rem" }} />}
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
}

function formatValue(value) {
  if (isNaN(value)) {
    return "Data not available";
  } else {
    return value;
  }
}

export default SchoolpageView;

