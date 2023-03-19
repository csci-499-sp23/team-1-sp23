import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Input,
  Typography,
  Grid,
  Paper
} from "@mui/material";

import React from 'react'

export default function ProfileView() {
  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 16, sm: 8, md: 16 }}>
        <Grid item xs={16} sm={4} md={16} >
          <Paper elevation={0}></Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
