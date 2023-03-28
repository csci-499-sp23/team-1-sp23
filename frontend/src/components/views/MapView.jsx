import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"
import Map from "../Map";

export default function MapView() {
  return (
    <Grid container sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid item xs={12} sm={12} md={12} sx={{}}>
        <Map />
      </Grid>
    </Grid>
  );
}

