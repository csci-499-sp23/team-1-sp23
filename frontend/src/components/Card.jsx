//MUI IMPORTS
import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DirectionsIcon from "@mui/icons-material/Directions";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import BarChartIcon from "@mui/icons-material/BarChart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import "./ScrollbarStyle.css";
import ReviewsModal from "./ReviewsModal";
import Stats from "./Stats";

import { Autocomplete } from "@react-google-maps/api";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const urlFix = (url) => {
  return url
    .split("http://")
    .at(-1)
    .split("https://")
    .at(-1)
    .split("www.")
    .at(-1)
    .toLowerCase();
};

const TabPanel = ({ children, value, index }) => {
  return value === index && children;
};

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      modal: false,
      username: null,
      role: null,
      uid: null,
      reviewData: [],
      verified: null,
      currSchool: "",
      snackbarOpen: false,
      snackbarSuccessOpen: false,
      directionError: false,
      profile: false,
      compareInfo: false,
      currentSchoolRatingAvg: [],
      origin: "",
      destination: "",
      travelMode: "DRIVING",
      avg: null,
      reviewCounts: {},
    };

    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  setReviewData = (data, stars) => {
    this.setState(() => ({
      reviewData: data,
      currentSchoolRatingAvg: stars,
    }));
    this.reviewsAvg(this.state.currentSchoolRatingAvg)
  };

  getReviews = async () => {
    const schoolRef = collection(
      db,
      `school/${this.props.school.school_name}/reviews`
    );
    const querySnapshot = await getDocs(schoolRef);
    this.setState({
      currSchool: this.props.school.school_name,
      destination: this.props.school.school_name,
    });
    const toAdd = [];
    const stars = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        toAdd.push(doc.data());
        stars.push(doc.data().stars);
      } else {
        console.log("No reviews yet");
        return null;
      }
    });
    this.setReviewData(toAdd, stars);
  };

  badVerificationMethod = (email, query) => {
    return query
      .split(" ")
      .every((q) =>
        new RegExp(
          "\b(highschool)\b|\b(.edu)\b|(highschool)" +
            q +
            "\b(highschool)\b|\b(.edu)\b|(highschool)"
        ).test(email)
      );
  };

  componentDidMount() {
    this.getReviews();
    //CHECK AUTH STATE ON LOAD
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.setUsername(docSnap.data().username);
            this.setRole(docSnap.data().role);
            this.setUid(auth.currentUser.uid);

            if (
              user.emailVerified &&
              this.badVerificationMethod(docSnap.data().username, "highschool")
            ) {
              this.setVerified(true);
            } else {
              this.setVerified(false);
            }
          } else {
            console.log("document does not exist");
          }
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.props.school.school_name !== this.state.currSchool)
      this.getReviews();
  }

  setUsername = (name) => {
    this.setState({
      username: name,
    });
  };

  setRole = (userRole) => {
    this.setState({
      role: userRole,
    });
  };
  setUid = (userUid) => {
    this.setState({
      uid: userUid,
    });
  };

  setVerified = (verify) => {
    this.setState({
      verified: verify,
    });
  };

  showModal = (bool) => {
    this.setState({
      modal: bool,
    });
  };

  handleTab = (_, value) => {
    this.setState(() => ({
      selectedTab: value,
    }));
  };

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true,
    });
  };

  handleSnackbarSuccessOpen = () => {
    this.setState({
      snackbarSuccessOpen: true,
    });
  };

  handleCompareInfoOpen = () => {
    this.setState({
      compareInfo: true,
    });
  };

  handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbarOpen: false,
      snackbarSuccessOpen: false,
      directionError: false,
      compareInfo: false,
    });
  };

  handleSave = () => {
    if (auth.currentUser != null || undefined) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      this.handleSnackbarSuccessOpen();
      return updateDoc(docRef, {
        saved_schools: arrayUnion(this.props.school.school_name),
      });
    } else {
      console.log("you are not logged in!");
      this.handleSnackbarOpen();
    }
  }

  reviewsAvg = (arr) => {
    for (const num of arr) {
      this.state.reviewCounts[num] = this.state.reviewCounts[num] ? this.state.reviewCounts[num] + 1 : 1;
    }
    this.setState({
      avg: (arr.reduce((a, b) => a + b) / arr.length).toFixed(1)
    })
  }

  setOrigin = (origin) => {
    console.log(origin);
    this.setState({
      origin: origin,
    });
  };

  setDestination = (destination) => {
    this.setState({
      destination: destination,
    });
  };
  
  setDirectionsError = () => {
    this.setState({
      directionError: true,
    });
  }; 

  handleModeChange = (e, mode) => {
    console.log(this.state.travelMode)
    this.setState({
      travelMode: mode
    })
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      this.props.updateDirOpts(
        "origin",
        this.autocomplete.getPlace().formatted_address
      );
    } else {
      console.log("Not complete yet");
    }
  }

  profileOpen = () => {
    this.setState({
      profile: true,
    });
  };

  compareOpen = () => {
    this.setState({
      compareInfo: true,
    });
  };

  onOriginChanged = () => {
    if(this.autocomplete !== null) { 
      console.log(this.autocomplete.getPlace())
    }
    else {
      console.log("not loaded")
    }
  }  

  onDestinationChanged = () => {
    if(this.autocomplete !== null) { 
      console.log(this.autocomplete.getPlace())
    }
    else {
      console.log("not loaded")
    }
  }  

  render() {
    return (
      <>
        <Card
          sx={{
            maxWidth: { xs: "100vw", sm: 400, md: 400 },
            maxHeight: "100%",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <CardMedia
            sx={{ height: 190 }}
            image="./src/assets/highschool.png"
            title="school"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.school.school_name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              {`${this.props.school.neighborhood}, ${this.props.school.borough
                .toLowerCase()
                .split(" ")
                .map((word) => word.replace(/^./, (c) => c.toUpperCase()))
                .join(" ")}`}
              {this.props.school.borough === "STATEN IS" && "land"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Tabs
                  sx={{ alignSelf: "center", mb: 2 }}
                  value={this.state.selectedTab}
                  onChange={this.handleTab}
                >
                  <Tab sx={{ fontWeight: "500", mr: 2 }} label="Overview" />
                  <Tab sx={{ fontWeight: "500", mx: 2 }} label="Reviews" />
                  <Tab sx={{ fontWeight: "500", ml: 2 }} label="About" />
                </Tabs>
                <Divider
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                />
                <TabPanel
                  value={0}
                  index={this.state.selectedTab}
                  sx={{ p: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Tooltip title="Bookmark">
                      <IconButton size="large" onClick={this.handleSave}>
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Directions">
                      <IconButton
                        size="large"
                        onClick={() => this.props.handleDirPanel(true)}
                      >
                        <DirectionsIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Compare">
                      <IconButton size="large" onClick={this.compareOpen}>
                        <CompareArrowsIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Statistics">
                      <IconButton size="large" onClick={this.profileOpen}>
                        <BarChartIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Divider
                    sx={{
                      mt: 1,
                      mb: 2,
                    }}
                  />

                  {/* START OF OVERVIEW TAB 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

*/}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {this.props.school.advancedplacement_courses != null ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <CloseIcon fontSize="small" color="error" />
                      )}
                      AP Courses
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {this.props.school.psal_sports_boys ||
                      this.props.school.psal_sports_girls ||
                      this.props.school.extracurricular_activities != null ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <CloseIcon fontSize="small" color="error" />
                      )}
                      Sports & Extracurriculars
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {this.props.school.school_accessibility ==
                      "Fully Accessible" ? (
                        <CheckIcon fontSize="small" color="success" />
                      ) : (
                        <CloseIcon fontSize="small" color="error" />
                      )}
                      Accessibility
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {this.props.school.overview_paragraph}
                  </Typography>

                  <Divider
                    sx={{
                      mt: 3,
                      mb: 2,
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: 3,
                      mb: 2,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ display: "flex" }}>
                        <LanguageIcon sx={{ fontSize: "1.5rem", pr: "20px" }} />
                        <Link
                          href={"https://" + urlFix(this.props.school.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="none"
                        >
                          {urlFix(this.props.school.website)}
                        </Link>
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex" }}>
                        <AccessTimeIcon
                          sx={{ fontSize: "1.5rem", pr: "20px" }}
                        />
                        {this.props.school.start_time +
                          " - " +
                          this.props.school.end_time}
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex" }}>
                        <PhoneIcon sx={{ fontSize: "1.5rem", pr: "20px" }} />
                        {this.props.school.phone_number}
                      </Grid>
                      <Grid item xs={12} sx={{ display: "flex" }}>
                        <LocationOnIcon
                          sx={{ fontSize: "1.5rem", pr: "20px" }}
                        />
                        {this.props.school.location
                          .split("(")
                          .at(0)
                          .toLowerCase()
                          .split(" ")
                          .map((word, i, arr) => {
                            if (i === arr.length - 2) {
                              return word.toUpperCase();
                            } else {
                              return word.replace(/^./, (c) => c.toUpperCase());
                            }
                          })
                          .join(" ")}
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider
                    sx={{
                      mt: 3,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ fontWeight: "500", mb: 2 }}
                  >
                    Reviews Overview
                  </Typography>

                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm container>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>5</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[5] == null || "" ? 0 : this.state.reviewCounts[5]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>4</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[4] == null || "" ? 0 : this.state.reviewCounts[4]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>3</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[3] == null || "" ? 0 : this.state.reviewCounts[3]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>2</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[2] == null || "" ? 0 : this.state.reviewCounts[2]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>1</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[1] == null || "" ? 0 : this.state.reviewCounts[1]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontSize="3.6rem"
                          component="div"
                        >
                          {this.state.avg == null ? 0 : this.state.avg}
                        </Typography>
                        <Grid item>
                          <Rating
                            name="read-only"
                            value={this.state.avg}
                            readOnly
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ width: "100%", mt: 2 }}>
                      {this.state.reviewData.slice(0, 3).map((data) => {
                        return (
                          <Grid container sx={{ m: 1 }}>
                            <Grid
                              item
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: "28px",
                                  height: "28px",
                                  fontSize: "1rem",
                                }}
                              >
                                {data.user[0]}
                              </Avatar>
                              <Box sx={{ ml: 3 }}>
                                <Typography sx={{ textOverflow: "ellipsis" }}>
                                  {data.content}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>

                  <Divider
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ fontWeight: "500", mb: 2 }}
                  >
                    Nearby Schools
                  </Typography>

                  <Divider
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{ fontWeight: "500", mb: 2 }}
                  >
                    Web Results
                  </Typography>
                </TabPanel>

                {/* END OF OVERVIEW TAB 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

*/}

                {/* START OF REVIEWS TAB 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

*/}
                {/* REVIEWS TAB */}
                <TabPanel
                  value={1}
                  index={this.state.selectedTab}
                  sx={{ p: 2 }}
                >
                 <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm container>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>5</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[5] == null || "" ? 0 : this.state.reviewCounts[5]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>4</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[4] == null || "" ? 0 : this.state.reviewCounts[4]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>3</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[3] == null || "" ? 0 : this.state.reviewCounts[3]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>2</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[2] == null || "" ? 0 : this.state.reviewCounts[2]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <Typography sx={{ mr: 1 }}>1</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={this.state.reviewCounts[1] == null || "" ? 0 : this.state.reviewCounts[1]}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            width: {
                              xs: "100%",
                              md: 220,
                            },
                          }}
                        ></LinearProgress>
                      </Grid>
                    </Grid>
                    <Grid xs={4} item>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Typography
                          variant="body"
                          fontSize="3.6rem"
                          component="div"
                        >
                          {this.state.avg == null ? 0 : this.state.avg}
                        </Typography>
                        <Box>
                          <Rating
                            name="read-only"
                            value={this.state.avg}
                            readOnly
                            precision={0.1}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 2,
                      }}
                    >
                      <Chip
                        label="Write A Review"
                        icon={<RateReviewIcon />}
                        variant="outlined"
                        sx={{
                          color: "#1E1E1E",
                          fontWeight: 500,
                          padding: "9px",
                          cursor: "pointer",
                        }}
                        onClick={
                          auth.currentUser
                            ? this.showModal.bind(null, true)
                            : this.handleSnackbarOpen
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* PUT REVIEWS CARD CODE HERE */}
                  <Box>
                    {this.state.reviewData != 0 || null || undefined ? (
                      this.state.reviewData.map((data) => {
                        return (
                          <>
                            <Divider
                              sx={{
                                mt: 3,
                                mb: 2,
                              }}
                            />
                            <Grid
                              container
                              columns={12}
                              direction="column"
                              spacing={2}
                            >
                              <Grid
                                item
                                sx={{ display: "flex", flexDirection: "row" }}
                              >
                                <Avatar>{data.user[0]}</Avatar>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Box sx={{ pl: 1 }}>
                                    <Typography variant="body1">
                                      {data.user}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {data.role + " • "}{" "}
                                      {data.verified
                                        ? "verified user"
                                        : "unverified user"}
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1">
                                    {data.datePosted}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Rating
                                  name="read-only"
                                  readOnly
                                  value={data.stars}
                                />
                              </Grid>
                              <Grid item>
                                <Typography>{data.content}</Typography>
                              </Grid>
                            </Grid>
                          </>
                        );
                      })
                    ) : (
                      <Box
                        sx={{
                          my: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>No reviews for this school yet!</Typography>
                      </Box>
                    )}
                  </Box>
                </TabPanel>

                {/* END OF REVIEWS TAB 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

*/}

                {/* START OF ABOUT TAB 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

*/}

                {/* ABOUT TAB */}
                <TabPanel
                  value={2}
                  index={this.state.selectedTab}
                  sx={{ p: 2 }}
                >
                  <Box>
                    {/* ACADEMICS */}
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 16, sm: 8, md: 16 }}
                    >
                      <Grid item xs={16} sm={4} md={16}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Academics
                        </Typography>
                      </Grid>
                      <Grid item xs={16} sm={4} md={16}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="600"
                        >
                          AP Courses
                        </Typography>
                        {this.props.school.advancedplacement_courses != null
                          ? this.props.school.advancedplacement_courses
                          : "N/A"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={16}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="600"
                        >
                          Language Courses
                        </Typography>
                        {this.props.school.language_classes}
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        mt: 3,
                        mb: 2,
                      }}
                    />

                    {/* SPORTS AND EXTRACURRICULAR */}
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 16, sm: 8, md: 8 }}
                    >
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Sports & Extracurricular Activities
                        </Typography>
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Boys
                        </Typography>
                        {this.props.school.psal_sports_boys}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Coed
                        </Typography>
                        {this.props.school.psal_sports_coed != null
                          ? this.props.school.psal_sports_coed
                          : "No Coed Sports"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Girls
                        </Typography>
                        {this.props.school.psal_sports_girls}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Extracurricular Activities/Clubs
                        </Typography>
                        {this.props.school.extracurricular_activities != null
                          ? this.props.school.extracurricular_activities
                          : "N/A"}
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        mt: 3,
                        mb: 2,
                      }}
                    />
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 16, sm: 8, md: 8 }}
                    >
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Accessibility
                        </Typography>
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        {this.props.school.school_accessibility}
                      </Grid>
                    </Grid>
                    <Divider
                      sx={{
                        mt: 3,
                        mb: 2,
                      }}
                    />

                    {/* STATISTICS */}
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                      columns={{ xs: 16, sm: 8, md: 16 }}
                    >
                      <Grid item xs={16} sm={4} md={16}>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Statistics
                        </Typography>
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Attendence Rate
                        </Typography>
                        {Number(this.props.school.attendance_rate) * 100 + "%"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Graduation Rate
                        </Typography>
                        {Number(this.props.school.graduation_rate) * 100 + "%"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          College Career Rate
                        </Typography>
                        {Math.round(
                          Number(this.props.school.college_career_rate) * 100
                        ) + "%"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Safety
                        </Typography>
                        {Math.round(
                          Number(this.props.school.pct_stu_safe) * 100
                        ) + "%"}
                      </Grid>
                      <Grid item xs={16} sm={4} md={8}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          fontWeight="500"
                        >
                          Diversity
                        </Typography>
                        {Math.round(
                          Number(this.props.school.pct_stu_enough_variety) * 100
                        ) + "%"}
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

        {this.state.profile && (
          <Stats
            onClose={() => this.setState({ profile: false })}
            school={this.props.school.dbn}
            schoolName={this.props.school.school_name}
          />
        )}

        {this.state.modal && (
          <ReviewsModal
            name={this.props.school.school_name}
            onClose={() => this.setState({ modal: false })}
            user={this.state.username}
            role={this.state.role}
            uid={this.state.uid}
            verified={this.state.verified}
          />
        )}

        {/* SNACKBARS THEIR POSITIONS DONT MATTER SO IM PUTTING THEM OUT HERE */}
        <Snackbar
          open={this.state.directionError}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          sx={{ zIndex: 10000 }}
        >
          <Alert onClose={this.handleSnackbarClose} severity="error">
            You need to select an origin and destination!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          sx={{ zIndex: 10000 }}
        >
          <Alert onClose={this.handleSnackbarClose} severity="warning">
            You need to be logged in to do that!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.snackbarSuccessOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
        >
          <Alert onClose={this.handleSnackbarClose} severity="success">
            Saved school!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.compareInfo}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
        >
          <Alert onClose={this.handleSnackbarClose} severity="info">
            Click on another marker to compare schools
          </Alert>
        </Snackbar>

        {this.props.opened && (
          <Card
            sx={{
              maxWidth: { xs: "100vw", sm: 400, md: 400 },
              maxHeight: "100%",
              zIndex: 999,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <CardContent>
              <IconButton
                onClick={() => {
                  this.props.handleDirPanel(false);
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  mt: 3,
                }}
              >
                <ToggleButtonGroup
                  value={this.props.travelMode}
                  exclusive
                  onChange={(_, mode) => {
                    this.props.updateDirOpts("travelMode", mode);
                  }}
                  fullWidth
                >
                  <ToggleButton value="DRIVING">
                    <Tooltip title="Driving">
                      <DirectionsCarIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="TRANSIT">
                    <Tooltip title="Transit">
                      <DirectionsSubwayIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="WALKING">
                    <Tooltip title="Walking">
                      <DirectionsWalkIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="BICYCLING">
                    <Tooltip title="Cycling">
                      <DirectionsBikeIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>

                <Box sx={{ mt: 5 }}>
                  <Typography>From:</Typography>
                  <Autocomplete
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                  >
                    <Paper
                      component="form"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: { xs: 1, sm: 1, md: 1 },
                        p: 1,
                        outline: "1px solid",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Please enter your starting position"
                        inputProps={{ "aria-label": "search google maps" }}
                        onChange={(e) => {
                          if (this.props.send)
                            this.props.updateDirOpts("send", false);
                          this.props.updateDirOpts("origin", e.target.value);
                        }}
                        onKeyPress={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                      />
                    </Paper>
                  </Autocomplete>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography>To:</Typography>
                  <Paper
                    component="form"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: { xs: 1, sm: 1, md: 1 },
                      p: 1,
                      outline: "1px solid",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      inputProps={{
                        "aria-label": "search google maps",
                        readOnly: true,
                      }}
                      value={this.props.school.school_name}
                    />
                  </Paper>
                </Box>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() => this.props.updateDirOpts("send", true)}
                >
                  Get Directions
                </Button>
                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Distance
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ display: "block" }}
                    >
                      {this.props.dist}
                    </Typography>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Commute Time
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ display: "block" }}
                    >
                      {this.props.time}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </>
    );
  }
}
export default InfoCard;
