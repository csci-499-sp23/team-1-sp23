import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LiveSearch from "./LiveSearch";
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

  const filteredArr = Schools.reduce((acc, current) => {
    const x = acc.find((item) => item.neighborhood === current.neighborhood);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoggedIn(true) : setLoggedIn(false);
    });
  }, []);

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

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
        <Box sx={{ mt: "10%" }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "2.25rem",
              filter: "drop-shadow(1px 1px 5px black)",
            }}
          >
            The easiest way to find the school best suited for your needs.
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
                  <InputLabel htmlFor="dialog-native">Borough</InputLabel>
                  <Select
                    native
                    value={age}
                    onChange={handleChange}
                    input={<OutlinedInput label="Age" id="dialog-native" />}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Queens</option>
                    <option value={20}>Brooklyn</option>
                    <option value={30}>Bronx</option>
                    <option value={30}>Manhattan</option>
                    <option value={30}>Staten Island</option>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Search</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>

      <FooterBox>
        <Container>
          <Row>
            <Column>
              <Heading>Queens</Heading>
              <FooterLink href="#"></FooterLink>
              <FooterLink href="#"></FooterLink>
              <FooterLink href="#"></FooterLink>
              {filteredArr.map((school, key) => {
                if (school.borocode === "Q") {
                  return <p key={key}>{school.neighborhood}</p>;
                }
              })}
            </Column>
            <Column>
              <Heading>Brooklyn</Heading>
              {filteredArr.map((school, key) => {
                if (school.borocode === "K") {
                  return <p key={key}>{school.neighborhood}</p>;
                }
              })}
            </Column>
            <Column>
              <Heading>Bronx</Heading>
              {filteredArr.map((school, key) => {
                if (school.borocode === "X") {
                  return <p key={key}>{school.neighborhood}</p>;
                }
              })}
            </Column>
            <Column>
              <Heading>Manhattan</Heading>
              {filteredArr.map((school, key) => {
                if (school.borocode === "M") {
                  return <p key={key}>{school.neighborhood}</p>;
                }
              })}
            </Column>
            <Column>
              <Heading>Staten Island</Heading>
              {filteredArr.map((school, key) => {
                if (school.borocode === "R") {
                  return <p key={key}>{school.neighborhood}</p>;
                }
              })}
            </Column>
          </Row>
        </Container>
      </FooterBox>
    </>
  );
}
