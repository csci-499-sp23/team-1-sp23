import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import InfoCard from "./Card";
import Drawerbar from "./views/DrawerNavBar";
import { mK } from "../config/environment";
import Directions from "./Directions";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const boroughs = ["Q", "M", "X", "K", "R"];

const boroughNames = {
  Q: "Queens",
  M: "Manhattan",
  X: "Bronx",
  K: "Brooklyn",
  R: "Staten Island",
};

const lib = ["places"];

class Map extends Component {
  constructor() {
    super();

    this.state = {
      schools: [],
      card: false,
      school: null,
      drawer: false,
      dirOpts: {
        origin: "",
        destination: "",
        destCoor: null,
        travelMode: "DRIVING",
        send: false,
        dist: "",
        time: "",
      },
      response: null,
      directionsRenderer: false,
      activeFilters: [...boroughs],
      searchQuery: null,
      center: {
        lat: 40.702944,
        lng: -73.89347,
      },
      zoom: 11,
    };
    this.autocomplete = null;
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ schools: data });
        })
        .catch((error) => console.log(error));
    }, 300);
  }

  onLoad = (autocomplete) => {
    this.autocomplete = autocomplete;
  };

  showCard = (bool, obj) => {
    this.setState({
      card: bool,
      school: obj,
    });
  };

  handleFilter(borough) {
    let activeFilters = [...this.state.activeFilters];
    if (activeFilters.includes(borough)) {
      activeFilters = activeFilters.filter((filter) => filter !== borough);
    } else {
      activeFilters.push(borough);
    }
    this.setState({ activeFilters, selectedBorough: borough });
  }

  openDrawer = (bool) => {
    this.setState({
      drawer: bool,
    });
  };

  handleDirections = (type, val) => {
    this.setState((x) => ({
      dirOpts: {
        ...x.dirOpts,
        [type]: val,
      },
    }));
  };

  handleDirectionsPanel = (bool) => {
    this.setState({
      directionsRenderer: bool,
    });
  };

  onPlaceChanged = () => {
    if (this.autocomplete !== null) {
      this.setState({
        searchQuery: this.autocomplete.getPlace().formatted_address,
      });
    } else {
      console.log("not loaded");
    }
  };

  goToNearbySchool = (lng, lat, school) => {
    this.setState({
      center: {
        lat: lat,
        lng: lng,
      },
      school: school,
      zoom: 16,
    })
  }

  handleSearch = () => {
    const place = this.autocomplete.getPlace().geometry;
    this.setState((prevState) => ({
      ...prevState,
      center: {
        lng: place.location.lng(),
        lat: place.location.lat(),
      },
      zoom: 17,
    }));
  };

  render() {
    const { schools, activeFilters } = this.state;
    const schoolsFiltered = schools.filter((school) =>
      activeFilters.includes(school.borocode)
    );

    return (
      <LoadScript googleMapsApiKey={mK} libraries={lib}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.state.center}
          zoom={this.state.zoom}
          clickableIcons={false}
          onClick={() => {
            this.showCard(false, null);
            this.handleDirectionsPanel(false);
          }}
          onZoomChanged={() => {
            if (this.map && !this.state.directionsRenderer) {
              this.setState({
                zoom: this.map.getZoom(),
              });
            }
          }}
          onLoad={(map) => (this.map = map)}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Directions
            modify={this.handleDirections}
            card={this.state.card}
            opened={this.state.directionsRenderer}
            {...this.state.dirOpts}
          />
          {/* Child components, such as markers, info windows, etc. */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar sx={{ zIndex: `100` }} disableGutters>
                <Stack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 4 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: {
                      xs: "flex-start",
                      md: "center",
                    },
                    maxWidth: "100%",
                  }}
                >
                  <Autocomplete
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                    onUnmount={() => console.log("unmounted")}
                  >
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
                      <IconButton
                        sx={{ p: "10px" }}
                        aria-label="menu"
                        onClick={this.openDrawer.bind(null, true)}
                      >
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
                        onClick={this.handleSearch}
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
                  <Drawerbar
                    status={this.state.drawer}
                    toggle={this.openDrawer}
                  />
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
                      maxWidth: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ overflow: "auto", p: "10px" }}
                    >
                      {boroughs.map((borough) => (
                        <Button
                          key={borough}
                          variant="contained"
                          onClick={() => this.handleFilter(borough)}
                          sx={{
                            backgroundColor: this.state.activeFilters.includes(
                              borough
                            )
                              ? "white"
                              : "#ffffff",
                            color: this.state.activeFilters.includes(borough)
                              ? "gray"
                              : "#000000",
                            fontWeight: 500,
                            fontSize: 14,
                            padding: "2px 14px 2px 14px",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            borderRadius: 5,
                            "&:hover": {
                              backgroundColor: "#efefef",
                              color: "#256fd4",
                            },
                            textTransform: "none",
                          }}
                        >
                          {boroughNames[borough]}
                        </Button>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Toolbar>
            </AppBar>
          </Box>
          {schoolsFiltered.map((school, key) => (
            <Marker
              key={key}
              position={{
                lat: Number(school.latitude),
                lng: Number(school.longitude),
              }}
              onClick={() => {
                const coord = school.geocoded_column.coordinates;
                this.showCard(true, school);
                this.handleDirections("destination", school.school_name);
                this.handleDirections("destCoor", {
                  lng: coord.at(0),
                  lat: coord.at(1),
                });
                this.handleDirections("dist", "");
                this.handleDirections("time", "");
              }}
            />
          ))}
          {this.state.card && (
            <InfoCard
              school={this.state.school}
              key={this.state.school + "2031"}
              updateDirOpts={this.handleDirections}
              handleDirPanel={this.handleDirectionsPanel}
              opened={this.state.directionsRenderer}
              {...this.state.dirOpts}
              goToSchool={this.goToNearbySchool}
            />
          )}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
