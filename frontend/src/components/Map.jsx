import React, { Component } from 'react'
import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import schools from "../assets/schools.json"

import MediaCard from './Card';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.698779,
  lng: -73.887854
};

export default function Map() {

  return (
    <LoadScript
      googleMapsApiKey = ""
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        clickableIcons={false}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Search for a school"
                  style={{
                    position: "relative",
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `2.5rem`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    zIndex: 100,
                    color: "white",
                  }}
                />
              </Autocomplete>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ 
                display: { 
                  xs: 'none', 
                  md: 'flex' 
                  } 
                }} >
                <Button variant="contained">Q</Button>
                <Button variant="contained">M</Button>
                <Button variant="contained">Bx</Button>
                <Button variant="contained">BK</Button>
                <Button variant="contained">SI</Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        {/* <Box sx={{
          position: "absolute",
          left: "15px",
          top: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "20%"
        }}>
          <Autocomplete>
            <input
              type="text"
              placeholder="Search for a school"
              style={{
                position: "relative",
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `clamp(100%, 100%, 100%)`,
                height: `2.5rem`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                zIndex: 100,
                color: "white"
              }}
            />
          </Autocomplete>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `10px 0`,
            zIndex: 100
          }}>
            <Button variant="contained">Q</Button>
            <Button variant="contained">M</Button>
            <Button variant="contained">Bx</Button>
            <Button variant="contained">BK</Button>
            <Button variant="contained">SI</Button>
          </Box>
        </Box> */}
            {schools.map((school, key) => {
              return(
                <Marker key = {key} onClick={() => MediaCard(school)} position={{
                  lat: Number(school.latitude),
                  lng: Number(school.longitude)
                }}>
                </Marker>
              )
              })}
            <MediaCard />
      </GoogleMap>
    </LoadScript>
  )
}