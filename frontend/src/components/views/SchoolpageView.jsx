import React, { useEffect } from 'react';
import NavBar from "./NavBar";
import { useLocation } from 'react-router-dom';

import { Box, Typography } from "@mui/material";
import { LocationOn } from '@mui/icons-material';

function SchoolpageView() {
  const location = useLocation();
  const school = location.state.school;
  return (
    <>
    <NavBar/>
    <Box sx={{ bgcolor: '#194973', py: 8 }}>
      <Typography variant="h4" component="h1" color="common.white" align="left" sx={{ marginLeft: '0.3in', fontFamily: 'Futura', fontSize: 45 }}>
        {school?.school_name}
      </Typography>
      <Typography variant="subtitle1" component="p"  color="common.white" align="left" sx={{ marginLeft: '0.3in', fontSize: 18 }}>
        <Box component="span" sx={{ verticalAlign: 'middle', marginRight: 1, fontSize: 30, color: 'common.white' }}>
          <LocationOn />
        </Box>
        {school?.location.split('(')[0].trim()} <br />
        Phone: {school?.phone_number}
      </Typography>
    </Box>

    </>
  );
}

export default SchoolpageView;
