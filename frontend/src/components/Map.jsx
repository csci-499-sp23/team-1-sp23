import React, { Component, useState } from 'react'
import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import schools from "../assets/schools.json"

import MediaCard from './Card';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.702944,
  lng: -73.893470
};

const boroughs =["Queens", "Manhattan", "Bronx", "Brooklyn", "Staten Island"]

// class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     this.school = {
//       school: "",
//     }
//   }
// }

class Map extends Component {
  constructor() {
    super(); 
    this.state = { 
      card: false, 
      school: null 
    }
  }

  showCard = (bool, obj) => {
    this.setState({
      card: bool,
      school: obj
    });
  }

  handleFilter(borough) {
    switch (borough) {
      case 'Queens':
        break;
      case 'Manhattan':
        break;
      case 'Bronx':
        break;
      case 'Brooklyn':
        break;
      case 'Staten Island':
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <LoadScript
        googleMapsApiKey=""
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          clickableIcons={false}
          onclick={this.showCard.bind(null, false)}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
              <Toolbar sx={{
                display: {
                  xs: 'flex',
                  md: 'flex'
                },
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: {
                  xs: "center",
                  md: "flex-start"
                },
                alignItems: {
                  xs: "center",
                  md: "center"
                },
              }} disableGutters>
                <Autocomplete>
                  <input
                    type="text"
                    placeholder="Search for a school"
                    style={{
                      position: `relative`,
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `388px`,
                      height: `2.8rem`,
                      padding: `0 12px`,
                      borderRadius: `5px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      outline: `none`,
                      zIndex: `100`,
                      textOverflow: `ellipses`,
                      color: "#1E1E1E",
                      backgroundColor: "#F8F9FA",
                      fontSize: `1rem`,
                      marginLeft: ".3rem",
                    }}
                  />
                </Autocomplete>
                <Box sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'flex',
                    md: 'flex'
                  },
                  width: "100%",
                  zIndex: 100,
                  ml: 2,
                }}>
                  {boroughs.map((borough) => (
                    <Button
                      key={borough}
                      onClick={this.handleFilter(borough)}
                      sx={{
                        my: 2,
                        display: 'block',
                        ml: 2,
                        backgroundColor: "#F8F9FA",
                        color: "#1E1E1E",
                      }}
                      variant="contained"
                    >
                      {borough}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          {schools.map((school, key) => {
            return (
              <Marker key={key} onClick={this.showCard.bind(null, true, school)} position={{
                lat: Number(school.latitude),
                lng: Number(school.longitude)
              }}>
              </Marker>
            )
          })}
          {this.state.card && (<MediaCard school = {this.state.school}/>)}
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default Map;