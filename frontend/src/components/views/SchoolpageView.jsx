import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { LocationOn, Phone, AccessTime, Fax, Email, Language } from '@mui/icons-material';
import NavBar from "./NavBar";

import Iframe from 'react-iframe';
import { Link } from 'react-router-dom';

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
                data 1
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                data 2
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                data 3
              </ListItemButton>
            </List>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Support</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Extracurricular Activities</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Student Outcomes</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box className="middle-container-wrapper">
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
                    <a href={`tel:${school?.phone_number}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>{school?.phone_number}</p>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`fax:${school?.fax_number}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Fax sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>{school?.fax_number}</p>
                    </a>
                  </ListItem>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <ListItem>
                    <a href={`https://${urlFix(school?.website)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                      <Language sx={{ fontSize: '1.5rem', pr: '15px' }} />
                      <p>School's Website</p>
                    </a>
                  </ListItem>
                  <ListItem>
                    <a href={`mailto:${school?.school_email}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={ { fontSize: '1.5rem', pr: '15px' }} />
                      <p>School's Email</p>
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
              <Link to="/map">
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
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

export default SchoolpageView;