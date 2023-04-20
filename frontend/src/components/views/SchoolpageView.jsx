import React from 'react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Button, Grid, List, ListItem, ListItemText, ListItemButton, Typography, ListItemIcon } from '@mui/material';
import { LocationOn, Phone, AccessTime, Fax, Email, Language, School } from '@mui/icons-material';
import NavBar from "./NavBar";
import Iframe from 'react-iframe';

import { MdOutlinePalette, MdOutlineHistoryEdu, MdOutlineQueryStats, MdOutlinePsychology, MdOutlineComputer, MdOutlineAccountBalance } from 'react-icons/md/index.js';
import { GiArchiveResearch, GiSpikedDragonHead, GiSpain, GiFrance, GiItalia, GiJapan, GiBookPile, GiGears, GiMusicalScore, GiIonicColumn, GiClayBrick, GiPaintBrush, GiBlackBook, GiQuillInk, GiEarthAmerica, GiCastle, GiUsaFlag } from 'react-icons/gi/index.js';
import { SlGraduation, SlCalculator } from 'react-icons/sl/index.js';
import { BiDna, BiAtom, BiMagnet } from 'react-icons/bi/index.js';
import { TbMathFunction, TbMap2 } from 'react-icons/tb/index.js';
import { HiCodeBracket, HiBeaker, HiOutlineCurrencyDollar } from 'react-icons/hi2/index.js';
import { RiGovernmentLine } from 'react-icons/ri/index.js';
import { FaMoneyBillWave, FaPiedPiperHat} from 'react-icons/fa/index.js';
import { SiMoleculer } from 'react-icons/si/index.js';
import { GoComment } from 'react-icons/go/index.js';

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  const latitude = Number(school?.latitude);
  const longitude = Number(school?.longitude);
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude},${latitude},${longitude},${latitude}&layer=mapnik&marker=${latitude},${longitude}`;

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
    return str ? str.split(',') : [];
  };

  const apClasses = splittingByComma(school?.advancedplacement_courses);
  const langClasses = splittingByComma(school?.language_classes);

  const iconsForAP = {
    'AP Art History': GiPaintBrush,
    'AP Biology': BiDna,
    'AP Calculus AB': SlCalculator,
    'AP Calculus BC': TbMathFunction,
    'AP Chemistry': HiBeaker,
    'AP Chinese Language and Culture': GiSpikedDragonHead,
    'AP Computer Science A': HiCodeBracket,
    'AP Computer Science Principles': MdOutlineComputer,
    'AP English Language and Composition': GiQuillInk,
    'AP English Literature and Composition': GiBlackBook,
    'AP Environmental Science': GiEarthAmerica,
    'AP European History': GiCastle,
    'AP French Language and Culture': GiFrance,
    'AP German Language and Culture': FaPiedPiperHat,
    'AP Comparative Government and Politics': RiGovernmentLine,
    'AP U.S. Government and Politics': MdOutlineAccountBalance,
    'AP Human Geography': TbMap2,
    'AP Italian Language and Culture': GiItalia,
    'AP Japanese Language and Culture': GiJapan,
    'AP Latin': GiIonicColumn,
    'AP Macroeconomics': FaMoneyBillWave,
    'AP Microeconomics': HiOutlineCurrencyDollar,
    'AP Music Theory': GiMusicalScore,
    'AP Physics 1': BiAtom,
    'AP Physics 2': SiMoleculer,
    'AP Physics C: Electricity and Magnetism': BiMagnet,
    'AP Physics C: Mechanics': GiGears,
    'AP Psychology': MdOutlinePsychology,
    'AP Spanish Language and Culture': GiSpain,
    'AP Spanish Literature and Culture': GiBookPile,
    'AP Statistics': MdOutlineQueryStats,
    'AP United States History': GiUsaFlag,
    'AP World History: Modern': MdOutlineHistoryEdu,
    'AP Research': GiArchiveResearch,
    'AP Seminar': SlGraduation,
    'AP 2-D Art and Design': MdOutlinePalette,
    'AP 3-D Art and Design': GiClayBrick,
  };

  const iconsForLang = {
    'Arabic': 'AR',
    'Bengali': 'BN',
    'Spanish': 'ES',
    'French': 'FR',
    'Italian': 'IT',
    'German' : 'DE',
    'Japanese' : 'JA',
    'Latin': 'LA',
    'Mandarin' : 'ZH',
    'Korean': 'KO',
    'American Sign Language': 'ASL',
    'Greek': 'EL',
    'Hebrew': 'IW',
    'Hindi': 'HI',
    'Haitian Creole': 'HT',
    'Polish': 'PL',
    'Portuguese': 'PT',
    'Punjabi' : 'PA',
    'Russian' : 'RU',
    'Urdu' : 'UR'
  };

  const getAPclassesIcon = (course) => {
    const Icon = iconsForAP[course.trim()] || School;
    return Icon;
  }

  const getLangclassesIcon = (course) => {
    return iconsForLang[course.trim()] || 'LN';
  };

  const [showAllAPs, setShowAllAps] = useState(false);
  const visibleAPs = showAllAPs ? apClasses : apClasses.slice(0, 5);

  const CommentIcon = ({ languageAbbreviation }) => (
    <div style={{ position: 'relative', top: '7px' }}>
      <GoComment size={28} />
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        textAlign: 'center',
        fontSize: '0.8rem',
        fontWeight: 'bold'
      }}>
        {languageAbbreviation}
      </div>
    </div>
  );
  
  return (
    <>
      <NavBar />
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ bgcolor: '#194973', py: 3.5 }}>
            <Typography
              variant="h4"
              component="h1"
              color="common.white"
              align="left"
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1in',
                fontSize: 45,
                fontWeight: '',
              }}
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
                marginLeft: '1in',
                fontFamily: 'Arial',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
              }}
              className="schoolpage-subtitle"
            >
              <Box
                component="span"
                sx={{
                  verticalAlign: 'middle',
                  marginRight: 1,
                  fontSize: 30,
                  color: 'common.white',
                }}
              >
                <LocationOn />
              </Box>
              <span>{school?.location.split('(')[0].trim()}</span>
              <Box
                component="span"
                sx={{
                  verticalAlign: 'middle',
                  marginLeft: '1em',
                  fontFamily: 'Arial',
                  fontSize: 39,
                  color: 'common.white',
                }}
              >
                <Phone />
              </Box>
              <span style={{ marginLeft: '0.4em' }}>Contact Info</span>
            </Typography>
          </Box>

          <Box sx={{ bgcolor: '#255478', py: 1.3 }}>
            <Typography
              variant="subtitle2"
              component="div"
              align="left"
              sx={{
                marginLeft: '1in',
                fontFamily: 'Arial',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
              }}
              className="schoolpage-subtitle"
            >
              <span>
                District: <strong style={{ color: 'white' }}>#{school?.dbn.slice(0, 2)}</strong>
              </span>
              <span style={{ marginLeft: '6em' }}>
                <strong style={{ color: 'white' }}>{school?.total_students}</strong> Students
              </span>
              <span style={{ marginLeft: '6em' }}>
                Grades <strong style={{ color: 'white' }}>{school?.finalgrades.slice(0, 1)}-{school?.finalgrades.slice(2 - 4)}</strong>
              </span>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={2}>
          <Box className="left-container">
            <Typography variant="h6" sx={{ mb: 2 }}>School Profile</Typography>
            <List sx={{ mb: 3 }}>
              <ListItemButton sx={{ pl: 0 }}>
                Overview
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Schedule and Contact
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Navigation
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Academics</Typography>
            <List>
              <ListItemButton sx={{ pl: 0 }}>
                Academic Opportunities 
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                AP Courses
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Language Courses
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Programs Offered
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Support</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Extracurricular Activities</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Outcomes</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="middle-container-wrapper">

            {/*SCHOOL PROFILE*/}
            <Box className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Overview</h2>
              <p>{school?.overview_paragraph}</p>
            </Box>
    
            <Box className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Schedule and Contact Information</h2>
              <h4>Campus Address</h4>
              <ListItem>
                <p>{school?.location.split('(')[0].trim()}</p>
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItem>
                  <AccessTime sx={{ fontSize: '1.5rem', pr: '15px' }} />
                  <p>{school?.start_time} - {school?.end_time}</p>
                </ListItem>
              </Box>
              <h4>Contact Info & School Website</h4>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <ListItem>
                    <a href={`tel:${school?.phone_number}`} style={{ display: 'flex', alignItems: 'center', color: '#16A1DD', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Phone sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      {school?.phone_number}
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`fax:${school?.fax_number}`} style={{ display: 'flex', alignItems: 'center', color: '#16A1DD', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Fax sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      {school?.fax_number}
                    </a>
                  </ListItem>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <ListItem>
                    <a href={`https://${urlFix(school?.website)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: '#16A1DD', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Language sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      School's Website
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`mailto:${school?.school_email}`} style={{ display: 'flex', alignItems: 'center', color: '#16A1DD', fontWeight: 'bold', textDecoration: 'none' }}>
                      <Email sx={ { fontSize: '1.5rem', pr: '15px' }} />
                      School's Email
                    </a>
                  </ListItem>
                </Box>
              </Box>
            </Box>

            <Box className="middle-container school-profile">
              <h3>School Profile</h3>
              <h2>Navigation</h2>
              <h4>Nearby Transportation</h4>
              <List>
                {school?.subway && school?.subway !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Subway: {school?.subway}</Typography>
                  </ListItem>
                )}
                {school?.bus && school.bus !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Bus: {school?.bus}</Typography>
                  </ListItem>
                )}
              </List>
              <Link to="/map" style={{ color: '#16A1DD' }}>
              <h4>Click here for more map and direction information</h4>
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
              </Link>
            </Box>

            {/*ACADEMICS*/}
            <Box className="middle-container academics">
              <h3>Academics</h3>
              <h2>Academic Opportunities</h2>
              <List>
                {school?.academicopportunities1 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities1} className="academic-list-items-text" />
                  </ListItem>
                )}
                {school?.academicopportunities2 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities2} className="academic-list-items-text" />
                  </ListItem>
                )}
                {school?.academicopportunities3 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities3} className="academic-list-items-text" />
                  </ListItem>
                )}
                {school?.academicopportunities4 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities4} className="academic-list-items-text" />
                  </ListItem>
                )}
                {school?.academicopportunities5 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities5} className="academic-list-items-text" />
                  </ListItem>
                )}
                {school?.academicopportunities6 && (
                  <ListItem className="academic-list-items">
                    <ListItemIcon>
                      <School />
                    </ListItemIcon>
                    <ListItemText primary={school?.academicopportunities6} className="academic-list-items-text" />
                  </ListItem>
                )}
              </List>
            </Box>

            <Box className="middle-container academics">
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
                  <Button variant="outlined" onClick={() => setShowAllAps(true)} color="primary" style={{ color: '#16A1DD', borderColor: '#16A1DD' }}>
                    Show all {apClasses.length} AP Courses
                  </Button>
                </Box>
              )}
            </Box>

            <Box className="middle-container academics">
              <h3>Academics</h3>
              <h2>Language Courses</h2>
              <Grid container spacing={2}>
                {langClasses.map((course) => (
                  <Grid key={course} item xs={6} sm={3}>
                    <Box display="flex" alignItems="center">
                      <ListItemIcon>
                        <CommentIcon languageAbbreviation={getLangclassesIcon(course)} />
                      </ListItemIcon>
                      <ListItemText primary={course.trim()} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box className="middle-container academics">
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
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

export default SchoolpageView;
