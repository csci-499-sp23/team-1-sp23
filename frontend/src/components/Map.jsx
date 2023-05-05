import React, { Component } from "react";
import { GoogleMap, MarkerF, StreetViewPanorama } from "@react-google-maps/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
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

import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc,collection, onSnapshot } from "firebase/firestore";

import Drawerbar from "./DrawerNavBar";
import InfoCard from "./Card";
import Directions from "./Directions";
import SavedSchoolsList from "./SavedSchoolsList";
import AdvanceFilters from "./AdvanceFilters";
import MapCard from "./MapCard";
import Pagination from "./Pagination";

import {IoLocationOutline} from "react-icons/io5/index.js"
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { routerPass } from "./routerPass";
import { MapLoader } from "./MapLoader";
import MAutocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";

const containerStyle = {
  width: "100%",
  margin: 22,
  borderRadius: 8,
  flexGrow: 1,
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
      advanceFilteredSchools: [],
      card: false,
      school: null,
      drawer: false,
      List: false,
      advanceFilters: false,
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
        lat: 40.686065,
        lng: -73.933439,
      },
      zoom: 11,
      saveList: false,
      navbar: true,
      visible: false,
      neighborhood: [],
      apCourses: [],
      languageCourse: [],
      sports: [],
      savedSchoolsList: [],

      currentPage: 1,
      schoolsPerPage: 10,
      loading: false,

    };
    this.goToNearbySchool = this.goToNearbySchool.bind(this);
    this.startDirections = this.startDirections.bind(this);
  }

  handleSave = (name) => {
    if (auth.currentUser != null || undefined) {
      if(!this.state.List.includes(name)) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        return updateDoc(docRef, {
          saved_schools: arrayUnion(name),
        });
      }
      else {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const removedSchool = this.state.List.filter(
          school => school !== name
        )
        return updateDoc(docRef, {
          saved_schools: removedSchool
        })
      }
    } else {
      console.log("you are not logged in!");
    }
  };

  getReviews = () => {
    const schoolRef = collection(
      db,
      `school/`
    );
    onSnapshot(schoolRef, (docSnap) => {
      docSnap.forEach((doc) => {
        if(doc.exists()) {
          console.log(doc.data())
        }
        
      })
    })
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    this.getReviews();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            this.setSavedSchools(docSnap.data().saved_schools);
          } else {
            console.log("document does not exist");
          }
        })
      }
    });
    if (this.props.location.state && this.props.location.state.longitude) {
      const { longitude, latitude, school, card } = this.props.location.state;
      this.setState({
        card: card
      })
      this.goToNearbySchool(longitude, latitude, school);
    }
    fetch("https://data.cityofnewyork.us/resource/23z9-6uk9.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          schools: data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
    if (this.props.location.state && this.props.location.state.borough != undefined && 
      (this.props.location.state.borough.length != 0 ||
        this.props.location.state.neighborhood.length != 0 ||
        this.props.location.state.apCourse.length != 0||
        this.props.location.state.language.length != 0 ||
        this.props.location.state.sports.length != 0)) {
      const { borough, neighborhood, apCourse, language, sport } = this.props.location.state;      
      this.setState({
        activeFilters: borough.length !== 0 || null || undefined ? [...borough] : [...boroughs],
        neighborhood: [...neighborhood],
        apCourses: [...apCourse],
        languageCourse: [...language],
        sports: sport,
      })
    }
  }

  setSavedSchools = (data) => {
    this.setState({
      savedSchoolsList: data
    })
  }

  showCard = (bool, obj) => {
    if (this.state.saveList === true) {
      this.setState({
        saveList: false,
        card: bool,
        school: obj,
      });
    } else {
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
        school: school,
        zoom: 17,
      });
      // this.startDirections(school);
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
      visible: bool,
    });
  };

  handleAdvanceFilterOpen = (bool) => {
    this.setState({
      advanceFilters: bool,
    })
  }

  startDirections = (school) => {
    const coord = school.geocoded_column.coordinates;
    this.showCard(true, school);
    this.handleDirections("destination", school.school_name);
    this.handleDirections("destCoor", {
      lng: coord.at(0),
      lat: coord.at(1),
    });
    this.handleDirections("dist", "");
    this.handleDirections("time", "");
  };


  render() {
    const indexOfLastSchool = this.state.currentPage * this.state.schoolsPerPage
    const indexOfFirstSchool = indexOfLastSchool - this.state.schoolsPerPage

    const { schools, activeFilters, neighborhood, apCourses, languageCourse, sports } = this.state;
    const schoolsFiltered = schools.filter((school) =>
      activeFilters.includes(school.borocode)
    );
    const neighborhoodFiltered = neighborhood.length != 0 || null ? schoolsFiltered.filter((school) => 
      neighborhood.includes(school.neighborhood)
    ) : schoolsFiltered;

    const searchObj = (searchParams, objectArr) => {
      const searchInput = searchParams.map((param) => param.toLowerCase())
      const results = [];
  
      objectArr.map((object) => {
        for (const property in object) {
          if (typeof object[property] === "string") {
            object[property].split(',').forEach((string) => {
              const trimmedSubstring = string.trim().toLowerCase()
              searchInput.forEach((input) => {
                if (trimmedSubstring.toLowerCase().includes(input)) {
                  results.push(object)
                }
              })
            })
          }
        }
      }, [])
      console.log("updating")
      return results;
    }
  
    const apFiltered = apCourses.length !== 0 ? searchObj(apCourses, neighborhoodFiltered) : neighborhoodFiltered;
    const langaugeFiltered = languageCourse.length !== 0 ? searchObj(languageCourse, neighborhoodFiltered) : apFiltered;

    const paginate = (number) => {
      console.log(number)
      this.setState({
        currentPage: number
      })
    }

    return (
      <MapLoader>
        <Drawerbar status={this.state.drawer} toggle={this.openDrawer} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { 
              xs: "column-reverse", 
              md: "row" 
            },
            backgroundColor: "#ffffff",
            color: "white",
            height: "100%",
          }}
        >
          {/* SIDE MENU BAR */}
          <Stack
            sx={{
              p: 1,
              flexDirection: { xs: "row", md: "column" },
              justifyContent: { xs: "space-evenly", md: "start" },
              backgroundColor: "#2b2d42",
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

          {/* TOP NAV BAR */}
          <Box sx={{ width: "100%", height: "100%"}} className= "navBar">
            <Grid container sx={{display: "flex", flexDirection: "column"}}>
              <Grid item sx={{ backgroundColor: "transparent" }}>
                <AppBar elevation={0} position="static" sx={{ backgroundColor: "transparent" }}>
                  <Toolbar sx={{ zIndex: { xs: 1, md: 100 } }} disableGutters>
                    <Stack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 2 }}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        maxWidth: "100%",
                      }}
                    >
                      <MAutocomplete
                        options={this.state.schools}
                        getOptionLabel={(option) => option.school_name}
                        noOptionsText="School not found"
                        blurOnSelect
                        onChange={(e, school) => {
                          this.props.navHook(`${school.school_name}`, {
                            state: {
                              school: school,
                              latitude: Number(school.latitude),
                              longitude: Number(school.longitude),
                            },
                          });
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
                          ml: { xs: 0, sm: 2, md: 2 },
                          m: { xs: 2 },
                          width: { xs: "93%", md: 570 },
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
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          overflow: "auto",
                          ml: {
                            xs: 1,
                            md: 1,
                          },
                          p: 1,
                        }}
                      >
                        {boroughs.map((borough) => (
                          <Button
                            key={borough}
                            variant="contained"
                            onClick={() => {
                              this.handleFilter(borough);
                              // this.props.navHook(`/filter/${borough}`)
                            }}
                            sx={{
                              backgroundColor:
                                this.state.activeFilters.includes(borough)
                                  ? "white"
                                  : "#ffffff",
                              color: this.state.activeFilters.includes(
                                borough
                              )
                                ? "#256fd4"
                                : "gray",
                              fontWeight: 500,
                              fontSize: 14,
                              padding: {
                                xs: "2px 3rem 2px 3rem",
                                md: "2px 14px 0px 14px",
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
                        <Button
                          variant="contained"
                          onClick={() => { this.handleAdvanceFilterOpen.bind(null, true) }}
                          sx={{
                            backgroundColor: "#ffffff",
                            color: "#256fd4",
                            fontWeight: 500,
                            fontSize: 14,
                            padding: {
                              xs: "2px 3rem 2px 3rem",
                              md: "2px 14px 2px 14px",
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
                          More options
                        </Button>
                      </Stack>
                    </Stack>
                  </Toolbar>
                </AppBar>
              </Grid>

              {/* MIDDLE CONTENT */}
              <Grid item sx={{
                display: "flex",
                flexDirection: { 
                  xs: "column", 
                  sm: "column", 
                  md: "row" 
                },
                flexGrow: 1,
                maxHeight: 850
              }}>
                <Grid sx={{
                  p: 2,
                  overflowY: "scroll",
                  "&::-webkit-scrollbar-track": {
                    m: 6
                  }

                }}
                  container
                  spacing={4}>
                  {langaugeFiltered.slice(indexOfFirstSchool, indexOfLastSchool).map((school, key) => {
                    return (
                      <Grid item xs={12} md={6} key={key}>
                        <MapCard school={school} loading={this.state.loading} />
                      </Grid>
                    );
                  })}
                  <Pagination
                    schoolsPerPage={this.state.schoolsPerPage}
                    totalSchools={schools.length}
                    paginate={paginate}
                  />
                  
                </Grid>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={this.state.center}
                  zoom={this.state.zoom}
                  clickableIcons={false}
                  onClick={() => {
                    this.showCard(false, null);
                    this.handleDirectionsPanel(false);
                    this.props.navHook("/map");
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
                  <StreetViewPanorama
                    onVisibleChanged={() => {
                      this.showCard(false, null);
                      this.setVisible(true, null);
                      console.log("visibility changed");
                    }}
                    onPovChanged={() => {
                      console.log("changed ");
                    }}
                    onCloseclick={(e) => {
                      console.log("closed Street view");
                    }}
                  />
                  {langaugeFiltered.map((school, key) => {
                    return (
                      <MarkerF
                        key={key}
                        position={{
                          lat: Number(school.latitude),
                          lng: Number(school.longitude),
                        }}
                        onClick={() => {
                          this.startDirections(school);
                          this.props.navHook(`${school.school_name}`, {
                            state: {
                              school: school,
                              latitude: Number(school.latitude),
                              longitude: Number(school.longitude),
                            },
                          });
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
                      openStats={this.props.location.state.card}
                    />
                  )}
                  {this.state.saveList && (
                    <SavedSchoolsList
                      goToSchool={this.goToNearbySchool}
                      onClose={() => this.setState({ saveList: false })}
                    />
                  )}
                  {this.state.advanceFilters && (
                    <AdvanceFilters
                      handleClose={() => setOpen(false)}
                    />
                  )}

                </GoogleMap>
              </Grid>
              
            </Grid>
          </Box>
        </Box>
      </MapLoader>
    );
  }
}

export default routerPass(Map);
