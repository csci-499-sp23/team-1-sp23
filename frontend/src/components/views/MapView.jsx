import React, { Component } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

import Map from '../Map';

export default function MapView() {
  return (
    <Grid sx={{height: "100vh"}}>
      <Grid xs={12} sm={8} md={5} item sx={{}}>
      </Grid>
      <Map />
    </Grid>
  )
}
