import React, { Component } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import Avatar from '@mui/material/Avatar'

const TabPanel = ({ children, value, index }) => {
  return value === index && children;
};

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      role: null,
      savedSchools: null,
      selectedTab: 0,
    };
  }
  
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            this.setUsername(docSnap.data().username);
            this.setRole(docSnap.data().role);
            this.setSavedSchools(docSnap.data().savedSchools);
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

  setSavedSchools = (schools) => {
    this.setState({
      savedSchools: schools,
    })
  }

  handleTab = (_, value) => {
    this.setState(() => ({ selectedTab: value }));
  };

  render() {
    return (
      <Grid container spacing={0} sx={{ minHeight: "100vh" }}>
        <Grid item xs={6} >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Typography >{this.state.username}</Typography>
            <Typography >{this.state.role}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Tabs
              sx={{ alignSelf: "center", mb: 2 }}
              value={this.state.selectedTab}
              onChange={this.handleTab}
            >
              <Tab sx={{ fontWeight: "500", mr: 2 }} label="Your Reviews" />
              <Tab sx={{ fontWeight: "500", mx: 2 }} label="Saved Schools" />
            </Tabs>

            {/* YOUR REVIEWS TAB */}
            <TabPanel value={0} index={this.state.selectedTab} sx={{ p: 2 }}>
              <Typography></Typography>
            </TabPanel>

            {/* YOUR SAVED SCHOOLS TAB */}
            <TabPanel value={1} index={this.state.selectedTab}>
              {this.state.savedSchools ? this.state.savedSchools==null : "You have no saved schools!"}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default ProfileView