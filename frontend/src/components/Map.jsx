import React, { Component, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import schools from "../assets/schools.json";

import InfoCard from "./Card";
import FiltersModal from "./MoreFilters";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 40.702944,
  lng: -73.89347,
};

const boroughs = [
  "Queens",
  "Manhattan",
  "Bronx",
  "Brooklyn",
  "Staten Island",
  "More Filters",
];
const lib = ["places"];

class Map extends Component {
  constructor() {
    super();
    this.state = {
      card: false,
      school: null,
    };
  }

  showCard = (bool, obj) => {
    this.setState({
      card: bool,
      school: obj,
    });
  };

  handleFilter(borough) {
    switch (borough) {
      case "Queens":
        break;
      case "Manhattan":
        break;
      case "Bronx":
        break;
      case "Brooklyn":
        break;
      case "Staten Island":
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="" libraries={lib}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          clickableIcons={false}
          onClick={this.showCard.bind(null, false)}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ zIndex: `100` }} disableGutters>
                <Stack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 5 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: {
                      xs: "flex-start",
                      md: "center",
                    },
                    maxWidth: "100%"
                  }}
                >
                  <Autocomplete>
                    <Paper
                      component="form"
                      sx={{
                        p: {
                          md: "2px 4px",
                        },
                        display: "flex",
                        alignItems: "center",
                        width: {
                          xs: 360,
                          md: 370,
                        },
                        ml: 1,
                        mt: { xs: 1, sm: 1, md: 0 },
                      }}
                    >
                      <IconButton sx={{ p: "10px" }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search For A School"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="directions"
                      >
                        <DirectionsIcon />
                      </IconButton>
                    </Paper>
                  </Autocomplete>
                  <Box
                    sx={{
                      position: {
                        md: "relative",
                      },
                      display: {
                        xs: "flex",
                        md: "flex",
                      },
                      justifyContent: {
                        xs: "space-evenly",
                        md: "flex-start",
                      },
                      width: "100%",
                      ml: {
                        xs: 0,
                        md: 2,
                      },
                      maxWidth: "100%"
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ overflow: 'auto'}}>
                      {boroughs.map((borough) => {
                        return (
                          <Chip
                            label={borough}
                            key={borough}
                            sx={{
                              backgroundColor: "#F8F9FA",
                              color: "#1E1E1E",
                              fontWeight: 500,
                              padding: "2px 6px 2px 6px",
                              cursor: "pointer",
                            }}
                            onClick={this.handleFilter(borough)}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </Stack>
              </Toolbar>
            </AppBar>
          </Box>
          {schools.map((school, key) => {
            return (
              <Marker
                key={key}
                onClick={this.showCard.bind(null, true, school)}
                position={{
                  lat: Number(school.latitude),
                  lng: Number(school.longitude),
                }}
              ></Marker>
            );
          })}
          {this.state.card && (
            <InfoCard
              school={this.state.school}
              key={this.state.school + "2031"}
            />
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
