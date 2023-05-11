import React, { Component } from "react";
import { GoogleMap, MarkerF, StreetViewPanorama } from "@react-google-maps/api";
import Grid from "@mui/material/Grid";
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
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

import InfoCard from "./Card";
import Directions from "./Directions";
import SavedSchoolsList from "./SavedSchoolsList";
import AdvanceFilters from "./AdvanceFilters";
import MapCard from "./MapCard";
import Pagination from "./Pagination";
import Stats from "./Stats";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { routerPass } from "./routerPass";
import { MapLoader } from "./MapLoader";
import MAutocomplete from "@mui/material/Autocomplete";

const containerStyle = {
  borderRadius: 8,
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
      schools: [], // ENTIRE SCHOOLS OBJECT IN AN ARRAY
      card: false,
      school: null, 
      currentSelectedSchool: null, // CURRENT SELECTED SCHOOL
      comparedSchool: null, // COMPARED SCHCOOL
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
        lat: 40.740977,
        lng: -73.95467,
      },
      zoom: 11,
      saveList: false,
      neighborhood: [],
      apCourses: [],
      languageCourse: [],
      sports: [],
      savedSchoolsList: [],

      currentPage: 1,
      schoolsPerPage: 10,
      loading: false,
      openStatsPage: false,
      compareSchool: false,
      selectedSecondMarker: false,
    };
    this.goToNearbySchool = this.goToNearbySchool.bind(this);
    this.startDirections = this.startDirections.bind(this);
  }

  handleSave = (name) => {
    if (auth.currentUser != null || undefined) {
      if(!this.state.savedSchoolsList.includes(name)) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        return updateDoc(docRef, {
          saved_schools: arrayUnion(name),
        });
      }
      else {
        const docRef = doc(db, 'users', auth.currentUser.uid)
        const removedSchool = this.state.savedSchoolsList.filter(
          school => school !== name
        )
        return updateDoc(docRef, {
          saved_schools: removedSchool,
        });
      }
    } else {
      console.log("you are not logged in!");
    }
  };

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            this.setSavedSchools(docSnap.data().saved_schools);
          } else {
            console.log("document does not exist");
          }
        });
      }
    });
    if (this.props.location.state && this.props.location.state.longitude) {
      const { longitude, latitude, school, card } = this.props.location.state;
      this.setState({
        card: card,
      });
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
    if (
      this.props.location.state &&
      this.props.location.state.borough != undefined &&
      (this.props.location.state.borough.length != 0 ||
        this.props.location.state.neighborhood.length != 0 ||
        this.props.location.state.apCourse.length != 0 ||
        this.props.location.state.language.length != 0 ||
        this.props.location.state.sports.length != 0)
    ) {
      const { borough, neighborhood, apCourse, language, sport } =
        this.props.location.state;
      this.setState({
        activeFilters:
          borough.length !== 0 || null || undefined
            ? [...borough]
            : [...boroughs],
        neighborhood: [...neighborhood],
        apCourses: [...apCourse],
        languageCourse: [...language],
        sports: sport,
      });
    }
  }

  setSavedSchools = (data) => {
    this.setState({
      savedSchoolsList: data,
    });
  };

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

  setFilters = (borough, neighborhood, apCourse, language, sports) => {
    console.log(borough, neighborhood, apCourse, language, sports)
    this.setState({
      activeFilters: borough,
      neighborhood: neighborhood,
      apCourses: apCourse,
      languageCourse: language,
      sports: sports,
    });
  };

  startDirections = (school) => {
    if (this.state.compareSchool) {
      this.handleComparing(school)
    }
    else {
      const coord = school.geocoded_column.coordinates;
      this.showCard(true, school);
      this.handleDirections("destination", school.school_name);
      this.handleDirections("destCoor", {
        lng: coord.at(0),
        lat: coord.at(1),
      });
      this.handleDirections("dist", "");
      this.handleDirections("time", "");
    }
  };

  compareOpen = (bool) => {
    this.setState({
      compareSchool: bool,
    });
  };

  handleComparing = (school) =>{
    if (this.state.compareSchool) {
      console.log(school, this.state.school)
      if (school.school_name != this.state.school.school_name) {
        console.log(school)
        this.setState({
          comparedSchool: school,
          selectedSecondMarker: true,
        })
      }
      else {
        this.setState({
          selectedSecondMarker: false
        })
      }
    }
  }

  showComparisonCard = (bool, obj) => {
    this.setState({
      compareSchool: bool,
      selectedSecondMarker: bool,
    });
  };

  render() {
    const indexOfLastSchool =
      this.state.currentPage * this.state.schoolsPerPage;
    const indexOfFirstSchool = indexOfLastSchool - this.state.schoolsPerPage;

    const {
      schools,
      activeFilters,
      neighborhood,
      apCourses,
      languageCourse,
      sports,
    } = this.state;
    const schoolsFiltered = schools.filter((school) =>
      activeFilters.includes(school.borocode)
    );
    const neighborhoodFiltered =
      neighborhood.length != 0 || null
        ? schoolsFiltered.filter((school) =>
            neighborhood.includes(school.neighborhood)
          )
        : schoolsFiltered;

    const searchObj = (searchParams, objectArr) => {
      const searchInput = searchParams.map((param) => param.toLowerCase());
      const results = [];

      objectArr.map((object) => {
        for (const property in object) {
          if (typeof object[property] === "string") {
            object[property].split(",").forEach((string) => {
              const trimmedSubstring = string.trim().toLowerCase();
              searchInput.forEach((input) => {
                if (trimmedSubstring.toLowerCase().includes(input)) {
                  results.push(object);
                }
              });
            });
          }
        }
      }, []);
      console.log("updating");
      return results;
    };

    const apFiltered =
      apCourses.length !== 0
        ? searchObj(apCourses, neighborhoodFiltered)
        : neighborhoodFiltered;
    const langaugeFiltered =
      languageCourse.length !== 0
        ? searchObj(languageCourse, neighborhoodFiltered)
        : apFiltered;

    const paginate = (number) => {
      this.setState({
        currentPage: number,
      });
    };

    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            maxHeight: "100vh",
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          {/* SIDE MENU BAR */}
          <Stack
            sx={{
              p: 1,
              display: "flex",
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

          <Box sx={{ width: "100%", height: "100%" }}>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              {/* Upper navbar + search + bourough selections */}
              <Grid
                item
                sx={{ backgroundColor: "transparent", height: "10vh" }}
              >
                <AppBar
                  elevation={0}
                  position="static"
                  sx={{ backgroundColor: "transparent" }}
                >
                  <Toolbar sx={{ zIndex: { xs: 1, md: 100 } }} disableGutters>
                    <Stack
                      direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                      }}
                      spacing={{ xs: 2, sm: 2, md: 2 }}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        maxWidth: "100%",
                        width: "100%",
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
                          maxWidth: { xs: "100%", md: 500 },
                          width: {
                            xs: "auto",
                            md: "100%",
                          },
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
                      {/* FILTERS */}
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          m: {
                            xs: 9,
                            md: 1,
                          },
                          p: { xs: 0, md: 1 },
                          display: "flex",
                          alignItems: "center",
                          maxWidth: { xs: "100vw", sm: "100%", md: "100%" },
                          overflowX: "auto",
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
                              color: this.state.activeFilters.includes(borough)
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
                          onClick={() =>
                            this.handleAdvanceFilterOpen(true, null)
                          }
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
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
                  height: "90vh",
                }}
              >
                {/* STATS AND USER LIST */}
                {this.props.openStatsPage && (
                  <Stats
                    onClose={() => this.setState({ openStatsPage: false })}
                    school={this.props.location.state.dbn}
                    schoolName={this.props.location.state.school_name}
                  />
                )}
                {this.state.saveList && (
                  <SavedSchoolsList
                    goToSchool={this.goToNearbySchool}
                    onClose={() => this.setState({ saveList: false })}
                  />
                )}

                {/* SIDE CARDS OF ALL SCHOOLS */}
                <Grid sx={{
                  p: 2,
                  overflowY: "scroll",
                  "&::-webkit-scrollbar-track": {
                    m: 6
                  },
                  display: { xs: "none", md: "flex" },
                  width: {
                    xs: 0,
                    sm: 0, 
                    md: "100%"
                  }
                }}
                  container
                  spacing={4}>
                  {langaugeFiltered.slice(indexOfFirstSchool, indexOfLastSchool).map((school, key) => {
                    return (
                      <Grid item xs={12} sm={12} md={this.state.selectedSecondMarker ? 12 : 6} key={key}>
                        <MapCard
                          school={school}
                          loading={this.state.loading}
                          openCard={this.showCard}
                          goToSchool={this.goToNearbySchool}
                          savedSchools={this.state.savedSchoolsList}
                          saveSchool={this.handleSave}
                        />
                      </Grid>
                    );
                  })}
                  {this.state.card ? null : <Pagination
                    schoolsPerPage={this.state.schoolsPerPage}
                    totalSchools={langaugeFiltered.length}
                    paginate={paginate}
                  />}
                </Grid>

                {/* MIDDLE POP UP CARD */}

                {this.state.card && (<Grid continer sx={{
                  overflowY: "scroll",
                  "&::-webkit-scrollbar-track": {
                    m: 2
                  },
                  maxHeight: "100%",
                  height: "auto"
                }}>
                  <Grid item xs={12} sx={{
                    width: "100%",
                  }}>
                    <InfoCard
                      school={this.state.school}
                      key={this.state.school + "2031"}
                      updateDirOpts={this.handleDirections}
                      handleDirPanel={this.handleDirectionsPanel}
                      opened={this.state.directionsRenderer}
                      {...this.state.dirOpts}
                      goToSchool={this.goToNearbySchool}
                      mobileClose={this.showCard}
                      compareSchool={this.compareOpen}
                      compareOpened={this.state.selectedSecondMarker}
                    />
                  </Grid>
                </Grid>)}

                {/* COMPARE SCHOOL CARD */}

                {this.state.selectedSecondMarker && (<Grid continer sx={{
                  overflowY: "scroll",
                  "&::-webkit-scrollbar-track": {
                    m: 2
                  },
                }}>
                  <Grid item xs={12} sx={{
                    width: "100%",
                  }}>
                      <InfoCard
                        school={this.state.comparedSchool}
                        key={this.state.school + "2031"}
                        updateDirOpts={this.handleDirections}
                        handleDirPanel={this.handleDirectionsPanel}
                        opened={this.state.directionsRenderer}
                        {...this.state.dirOpts}
                        goToSchool={this.goToNearbySchool}
                        mobileClose={this.showComparisonCard}
                        compareOpened={this.state.selectedSecondMarker}
                      />
                  </Grid>
                </Grid>)}
                

                {/* MAP */}

                <Grid
                  item
                  sx={{
                    m: {
                      xs: 2,
                      md: 2,
                    },
                    width: { xs: "auto", md: "100%" },
                    maxHeight: "100%",
                    // height: { xs: 400, md: "auto" },
                  }}
                >
                  <MapLoader>
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
                              this.handleComparing(school);
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
                      {this.state.advanceFilters && (
                        <AdvanceFilters
                          handleClose={() => this.handleAdvanceFilterOpen(false)}
                          setFilters={() => this.setFilters}
                          mapPage={true}
                        />
                      )}
                    </GoogleMap>
                  </MapLoader>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default routerPass(Map);
