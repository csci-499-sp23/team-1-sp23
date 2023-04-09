import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { LocationOn, Phone, AccessTime } from '@mui/icons-material';

import NavBar from "./NavBar";

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  
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
                Schedule & Navigation
              </ListItemButton>
              <ListItemButton sx={{ pl: 0 }}>
                Contact Information
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
              <h2>Schedule and Navigation</h2>
              <h4>Start and End Time</h4>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItem>
                  <AccessTime sx={{ fontSize: '1.5rem', pr: '15px' }} />
                  <p>{school?.start_time} - {school?.end_time}</p>
                </ListItem>
              </Box>
              <h4>Nearby Transportation</h4>
              <List>
                {school?.subway && school.subway !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Subway: {school.subway}</Typography>
                  </ListItem>
                )}
                {school?.bus && school.bus !== "N/A" && (
                  <ListItem>
                    <Typography variant="p">Bus: {school.bus}</Typography>
                  </ListItem>
                )}
              </List>
            </Box>
            <Box className="middle-container">
              Test 3
            </Box>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}

export default SchoolpageView;
