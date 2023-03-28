import React from "react";
import Grid from "@mui/material/Grid";
import Map from "../Map";
import Drawerbar from "./DrawerNavBar";

export default function MapView() {
  return (
    <Grid container sx={{ height: "100vh", zIndex: 1200 }}>
      <Grid item xs={12} sm={4} md={3} sx={{ zIndex: 1201 }}>
        <Drawerbar />
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Map />
      </Grid>
    </Grid>
  );
}

