import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";


export default function Navbar({ loggedIn, handleLogout }) {
    return(
  <Box sx={{ width: "100%" }}>
    <AppBar position="sticky" style={{ background: "#2b2d42" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="p"
          sx={{
            flexGrow: 1,
            fontSize: "1.5rem",
            fontWeight: "bold",
            ml: "2rem",
          }}
        >
          SchoolsDB
        </Typography>
        <Box>
          <Button color="inherit" href="/map">
            Map
          </Button>
          {!loggedIn && (
            <Button className="logged-out" color="inherit" href="/login">
              Login
            </Button>
          )}
          {!loggedIn && (
            <Button className="logged-out" color="inherit" href="/signup">
              Sign Up
            </Button>
          )}
          {loggedIn && (
            <Button
              className="logged-in"
              color="inherit"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          )}
          {loggedIn && (
            <Button className="logged-in" color="inherit" href="/profile">
              Profile
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
    );
}