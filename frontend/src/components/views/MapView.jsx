import React from "react";
import Grid from "@mui/material/Grid";
import Map from "../Map";
import Navbar from "./NavBar";

export default function MapView() {
  return (
    <>
    
    <Grid sx={{ height: "100vh" }}>
      <Grid xs={12} sm={8} md={5} item sx={{}}></Grid>
      <Map />
    </Grid>
    </>
  );
}
