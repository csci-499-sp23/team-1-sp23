import React from 'react';
import NavBar from "./NavBar";
import { useLocation } from 'react-router-dom';

import { Box, Typography } from "@mui/material";
import { LocationOn, Phone } from '@mui/icons-material';


function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  
  return (
    <>
    <NavBar />
    <Box sx={{ bgcolor: '#194973', py: 3.5 }}>
      <Typography
        variant="h4"
        component="h1"
        color="common.white"
        align="left"
        sx={{ display: 'flex', alignItems: 'center', marginLeft: '1in', fontFamily: 'Futura', fontSize: 45, fontWeight: '' }}
      >
        {school?.school_name}
      </Typography>
      <Typography variant="subtitle1" component="div" color="common.white" align="left" sx={{ marginLeft: '1in', fontFamily: 'Arial', fontSize: 18, display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ verticalAlign: 'middle', marginRight: 1, fontSize: 30, color: 'common.white' }}>
          <LocationOn />
        </Box>
        <span>{school?.location.split('(')[0].trim()}</span>
        <Box component="span" sx={{ verticalAlign: 'middle', marginLeft: '1em', fontFamily: 'Arial', fontSize: 39, color: 'common.white' }}>
          <Phone />
        </Box>
        <span style={{marginLeft: '0.4em'}}>Contact Info</span>
      </Typography>
    </Box>
    
    <Box sx={{ bgcolor: '#255478', py: 1.3 }}>
      <Typography variant="subtitle2" component="div" align="left" sx={{ marginLeft: '1in', fontFamily: 'Arial', fontSize: 18, display: 'flex', alignItems: 'center' }}>
        <span>District: <strong style={{color: 'white'}}>#{school?.dbn.slice(0, 2)}</strong></span>
        <span style={{marginLeft: '6em'}}><strong style={{color: 'white'}}>{school?.total_students}</strong> Students</span>
        <span style={{marginLeft: '6em'}}>Grades <strong style={{color: 'white'}}>{school?.finalgrades.slice(0, 1)}-{school?.finalgrades.slice(2-4)}</strong></span>
      </Typography>
    </Box>

    </>
  );
}

export default SchoolpageView;
