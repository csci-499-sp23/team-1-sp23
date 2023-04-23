import React, { Component } from "react";
import { GoogleMap, MarkerF, StreetViewPanorama  } from "@react-google-maps/api";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { mK } from "../config/environment";
import { auth } from "../config/firebase";
import Drawerbar from "./DrawerNavBar";
import InfoCard from "./Card";
import Directions from "./Directions";
import SavedSchoolsList from "./SavedSchoolsList";
import { routerPass } from "./routerPass";
import { MapLoader } from "./MapLoader";
import MAutocomplete from "@mui/material/Autocomplete";

// function handleNavigation(Map) {

//   return props => <Map navHook={useNavigate()}/>
//   console.log("navigating...")
//   const navigate = useNavigate();
//   navigate(`/place/${school}`);
//   "Q", "M", "X", "K", "R"
// }

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

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      card: false,
      school: null,
      drawer: false,
      savedSchools: false,
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
      saveList: false,
      navbar: true,
      visible: false
    };
    this.goToNearbySchool = this.goToNearbySchool.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { longitude, latitude, school } = this.props.location.state;
      this.goToNearbySchool(longitude, latitude, school);
    }
    fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ schools: data });
      })
      .catch((error) => console.log(error));
  }

  showCard = (bool, obj) => {
    if (this.state.saveList === true) {
      this.setState({
        saveList: false,
        card: bool,
        school: obj,
      });
    }
    else {
      this.setState({
        card: bool,
        school: obj,
      });
    }
  };

  handleFilter(borough) {
    const boroughsCopy = ["Q", "M", "X", "K", "R"];
    let activeFilters = [...this.state.activeFilters];
    if (activeFilters.includes(borough)) {
      if (borough === activeFilters[0] && activeFilters.length !== 5) {
        activeFilters = boroughsCopy;
      } else {
        activeFilters = activeFilters.filter((filter) => filter == borough);
      }
    } else {
      activeFilters.push(borough);
    }
    this.setState({ activeFilters, selectedBorough: borough });
  }

  navbarVisibility = (bool) => {
    console.log("entered street view", bool)
    this.setState({
      navbar: bool,
    });
  };

  handleListOpen = (bool) => {
    this.setState({
      saveList: bool,
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

  goToNearbySchool = (lng, lat, school) => {
    if (this.state.card == false) {
      this.setState({
        center: {
          lat: lat,
          lng: lng,
        },
        card: true,
        school: school,
        zoom: 17,
      });
    } else {
      this.setState({
        center: {
          lat: lat,
          lng: lng,
        },
        school: school,
        zoom: 17,
      });
    }
  };

  setVisible = (bool) => {
    this.setState({
      visible: bool
    })
  }

  render() {
    const { schools, activeFilters } = this.state;
    const schoolsFiltered = schools.filter((school) =>
      activeFilters.includes(school.borocode)
    );

    return (
      <MapLoader>
        <Drawerbar status={this.state.drawer} toggle={this.openDrawer} />
        <Box
          sx={{
            display: "flex",
            flexDirection: {xs: "column-reverse", md:"row"},
            backgroundColor: "#2b2d42",
            color: "white",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              m: 1,
              flexDirection: {xs: "row", md:"column"},
              justifyContent: {xs: "space-evenly", md: "start"}
            }}
          >
            <Link href="/" sx={{ color: "white" }}>
              <IconButton sx={{ color: "white" }}>
                <HomeIcon />
              </IconButton>
            </Link>
            <IconButton sx={{ color: "white" }}>
              <MapIcon />
            </IconButton>
            {auth.currentUser !== null ? (
              <IconButton
                sx={{ color: "white" }}
                onClick={this.handleListOpen.bind(null, true)}
              >
                <BookmarkBorderIcon />
              </IconButton>
            ) : null}
          </Stack>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.center}
            zoom={this.state.zoom}
            clickableIcons={false}
            onClick={() => {
              this.showCard(false, null);
              this.handleDirectionsPanel(false);
              this.props.navHook("/map")
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
            {/* Child components, such as markers, info windows, etc. this.navbarVisibility(false, null)*/}

            <StreetViewPanorama
              onVisibleChanged={() => {
                this.showCard(false, null)
                this.navbarVisibility(false, null)
                this.setVisible(true, null)
                console.log("visibility changed")
              }}
              onPovChanged={() => {
                console.log("changed ")
              }}
              onCloseclick={(e) => {console.log("closed Street view")}}
            />

            <Box sx={{ flexGrow: 1 }}>  
              {this.state.navbar && <AppBar position="static">
                <Toolbar sx={{ zIndex: {xs: 1, md: 999} }} disableGutters>
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
                    <MAutocomplete
                      options={this.state.schools}
                      getOptionLabel={(option) => option.school_name}
                      noOptionsText="School not found"
                      blurOnSelect
                      onChange={(e, school) => {
                        this.goToNearbySchool(
                          Number(school.longitude),
                          Number(school.latitude),
                          school
                        );
                      }}
                      PaperComponent={(props) => (
                        <Paper
                          {...props}
                          sx={{
                            borderRadius: 0,
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            boxShadow: "0 0.25rem 0.25rem gray",
                            mt: "-0.6rem",
                          }}
                        />
                      )}
                      sx={{
                        ml: {xs: 0, sm: 2, md: 2},
                        m: {xs: 2},
                        width: {xs: "93%", md: 570},
                        backgroundColor: "transparent",
                      }}
                      renderInput={(params) => {
                        return (
                          <Paper
                            ref={params.InputProps.ref}
                            sx={{
                              p: "0.5rem",
                              display: "flex",
                              borderRadius: 3,
                            }}
                            elevation={3}
                          >
                            <SearchIcon
                              sx={{ color: "#1877d2", alignSelf: "center" }}
                            />
                            <InputBase
                              inputProps={{ ...params.inputProps }}
                              placeholder="Search for a school"
                              sx={{ width: "100%", ml: "0.25rem" }}
                            />
                          </Paper>
                        );
                      }}
                    />
                    <Box
                      sx={{
                        position: {
                          md: "relative",
                        },
                        display:"flex",
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
                        sx={{ overflow: "auto",
                        ml: {
                          xs: 2,
                          md: 2,
                        },
                      }}
                      >
                        {boroughs.map((borough) => (
                       
                          <Button
                            key={borough}
                            variant="contained"
                            onClick={() => {
                              this.handleFilter(borough)
                              // this.props.navHook(`/filter/${borough}`)
                            }}
                            sx={{
                              backgroundColor:
                                this.state.activeFilters.includes(borough)
                                  ? "white"
                                  : "#ffffff",
                              color: this.state.activeFilters.includes(borough)
                                ? "#256fd4"
                                : "gray",
                              fontWeight: 500,
                              fontSize: 14,
                              padding: {
                                xs: "2px 3rem 2px 3rem",
                                md: "2px 14px 2px 14px"
                              },
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
              </AppBar>}
              
            </Box>
            {schoolsFiltered.map((school, key) => {
              return (
                <MarkerF
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
                    this.props.navHook(`${school.school_name}`, 
                    {state: {
                      school: school, 
                      latitude: Number(school.latitude), 
                      longitude: Number(school.longitude)
                    }})
                  }}
                />
              );
            })}
            {this.state.card && (
              <InfoCard
                school={this.state.school}
                key={this.state.school + "2031"}
                updateDirOpts={this.handleDirections}
                handleDirPanel={this.handleDirectionsPanel}
                opened={this.state.directionsRenderer}
                {...this.state.dirOpts}
                goToSchool={this.goToNearbySchool}
                mobileClose={this.showCard}
              />
            )}
            {this.state.saveList && (
              <SavedSchoolsList
                goToSchool={this.goToNearbySchool}
                onClose={() => this.setState({ saveList: false })}
              />
            )}
          </GoogleMap>
        </Box>
      </MapLoader>
    );
  }
}

export default routerPass(Map);
