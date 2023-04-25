import { Box, Typography, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LiveSearch from "../LiveSearch";
import Link from "@mui/material/Link"
import { useNavigate } from 'react-router-dom';
import {
  FooterBox,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "../FooterStyling";
import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import SchoolsData from "../../schoolData";

import Navbar from "./NavBar";

export default function HomepageView() {
  const Schools = SchoolsData();
  const navigate = useNavigate();
  

  const filteredArr = Schools.reduce((acc, current) => {
    const x = acc.find((item) => item.neighborhood === current.neighborhood);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const [borough, setBorough] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  const handleChange = (event) => {
    setBorough((event.target.value));
  };

  const handleSearch = () => {
    navigate(`./map/`, {state: {borough: borough} });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      console.log("signed out");
    });
  };

  return (
    <>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Box className="home-banner">
        <Box sx={{ mt: {xs: "30%", sm:"15%"} }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "2.25rem",
              filter: "drop-shadow(1px 1px 5px black)",
            }}
          >
            The easiest way to find the NYC highschool suited for your needs.
          </Typography>
        </Box>
        <Box sx={{ mt: "5rem", width: "50%" }}>
          <LiveSearch />
        </Box>
        <div>
          <Button
            onClick={handleClickOpen}
            sx={{ mt: "3rem", padding: ".7rem" }}
            style={{ background: "#60a5fa", color: "white" }}
          >
            Advance Search
          </Button>
          <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Filter your Search</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="borough-selector">Borough</InputLabel>
                  <Select
                    value={borough}
                    onChange={handleChange}
                    labelId="borough-selector"
                  >
                    <MenuItem value={"Q"}>Queens</MenuItem>
                    <MenuItem value={"K"}>Brooklyn</MenuItem>
                    <MenuItem value={"X"}>Bronx</MenuItem>
                    <MenuItem value={"M"}>Manhattan</MenuItem>
                    <MenuItem value={"R"}>Staten Island</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSearch}>Search</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
}
