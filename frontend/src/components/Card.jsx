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
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating'
import Avatar from "@mui/material/Avatar";

import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StarIcon from "@mui/icons-material/Star";
import DirectionsIcon from '@mui/icons-material/Directions';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import "./ScrollbarStyle.css";
import ReviewsModal from "./ReviewsModal";

import {auth, db} from '../config/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, getDocs, updateDoc, arrayUnion } from "firebase/firestore";

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
    };
  }   
  
  setReviewData = (data) => {
    this.setState((arr) => ({
      reviewData: [...arr.reviewData, data]
    }))
  }
  
  getReviews = async() => {
    const schoolRef = collection(db,`school/${this.props.school.school_name}/reviews`)
    const querySnapshot =  await getDocs(schoolRef)
    querySnapshot.forEach((doc) => {
      if(doc.exists()) {
        this.setReviewData(doc.data())
      }
      else {
        console.log("No reviews yet");
        return null;
      }
    })
  }  

  componentDidMount() {
    this.getReviews()
    //CHECK AUTH STATE ON LOAD
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.setUsername(docSnap.data().username);
            this.setRole(docSnap.data().role);
            this.setUid(auth.currentUser.uid)
            this.setVerified(docSnap.data().verfied_user)
          } else {
            console.log("document does not exist");
          }
        });
      } else {
        console.log("not logged in");
      }
    });
  }

  setUsername = (name) => {
    this.setState({
      username: name,
    })
  }

  setRole = (userRole) => {
    this.setState({
      role: userRole,
    })
  }
  setUid = (userUid) => {
    this.setState({
      uid: userUid,
    })
  }

  setVerified = (verify) => {
    this.setState({
      verified: verify
    })
  }

  showModal = (bool) => {
    this.setState({
      modal: bool,
    })
  }
 
  handleTab = (_, value) => {
    this.setState(() => ({ 
      selectedTab: value
    }));
  };

  handleSave = () => {
    if (auth.currentUser != null || undefined) {
      const docRef = doc(db, "users", auth.currentUser.uid)
      return updateDoc(docRef, {
        saved_schools: arrayUnion(this.props.school.school_name)
      })
    }
    else {
      console.log("you are not logged in!")
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
          width: "clamp(320px, calc(100vw-90%), 100%)",
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
                <Tab sx={{ fontWeight: "500", mr: 2 }} label="Overview" on/>
                <Tab sx={{ fontWeight: "500", mx: 2 }} label="Reviews" />
                <Tab sx={{ fontWeight: "500", ml: 2 }} label="About" />
              </Tabs>
              <Divider
                    sx={{
                      mt: 1,
                      mb: 2,
                    }}
                  />
              <TabPanel value={0} index={this.state.selectedTab} sx={{ p: 2 }}>
                  <Box>
                    <IconButton size="large" onClick={this.handleSave}>
                      <BookmarkBorderIcon />
                    </IconButton>
                    <IconButton size="large">
                      <DirectionsIcon />
                    </IconButton>
                  </Box>
                  <Divider
                    sx={{
                      mt: 1,
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
                      <AccessTimeIcon sx={{ fontSize: "1.5rem", pr: "20px" }} />
                      {this.props.school.start_time +
                        " - " +
                        this.props.school.end_time}
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex" }}>
                      <PhoneIcon sx={{ fontSize: "1.5rem", pr: "20px" }} />
                      {this.props.school.phone_number}
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex" }}>
                      <LocationOnIcon sx={{ fontSize: "1.5rem", pr: "20px" }} />
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
                <Typography variant="h6" color="text.primary">
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
                        value={100}
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
                      <Typography sx={{ mr: 1 }}>4</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={75}
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
                        value={50}
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
                        value={25}
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
                        value={0}
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
                        4.1
                      </Typography>
                        <Grid item>
                          <Rating name="read-only" value={2} readOnly size="small"/>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider
                  sx={{
                    mt: 2,
                    mb: 3,
                  }}
                />
              </TabPanel>

              {/* REVIEWS TAB */}
              <TabPanel value={1} index={this.state.selectedTab} sx={{ p: 2 }}>
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
                        value={100}
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
                      <Typography sx={{ mr: 1 }}>4</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={75}
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
                        value={50}
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
                        value={25}
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
                        value={0}
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
                        variant="body"
                        fontSize="3.6rem"
                        component="div"
                      >
                        4.1
                      </Typography>
                      <Grid item>
                        <Rating name="read-only" value={3} readOnly precision={0.5}/>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
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
                      onClick={(auth.currentUser ? this.showModal.bind(null, true) : undefined)}
                    ></Chip>
                  </Grid>
                </Grid>
                <Divider
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                />

                {/* PUT REVIEWS CARD CODE HERE */}
                <Box>
                    {this.state.reviewData.map(data => {
                      return (
                        <Grid container columns={12} direction="column" spacing={2}>
                          <Grid item sx={{ display: "flex", flexDirection: "row" }}>
                            <Avatar>{data.user[0]}</Avatar>
                            <Box sx={{ pl: 1 }}>
                              <Typography variant="body1">{data.user}</Typography>
                              <Typography variant="body2" color="text.secondary">{data.role + " • " + data.verified}</Typography>
                            </Box>
                          </Grid>
                          <Grid item sx={{ display: "flex", alignItems: "center" }}>
                            <Rating name="read-only" read-only value={data.stars} />
                            <Typography sx={{ pl: 1 }} variant="body1">{data.datePosted}</Typography>
                          </Grid>
                          <Grid item >
                            <Typography>{data.review}</Typography>
                          </Grid>
                        </Grid>
                      )
                    })
                    }
                </Box>
              </TabPanel>

              {/* ABOUT TAB */}
              <TabPanel value={2} index={this.state.selectedTab} sx={{ p: 2 }}>
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
          <Button size="small" >Share</Button>
          <Button size="small" >Learn More</Button>
        </CardActions>
      </Card>
        {this.state.modal && (
          <ReviewsModal
            name={this.props.school.school_name}
            onClose={() => this.setState({ modal: false })}
            user={this.state.username}
            role={this.state.role}
            uid={this.state.uid}
            verified={this.state.verified}
          />)}
      </>
    );
  }
}
export default InfoCard;
