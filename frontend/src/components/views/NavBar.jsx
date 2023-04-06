import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";


export default function Navbar({ loggedIn, handleLogout }) {
  const { pathname } = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickTitle = () => {
    document.title = "SchoolsDB";
  };
    return(
  <Box sx={{ width: "100%" }}>
    <AppBar position="sticky" style={{ background: "#2b2d42" }}>
      <Toolbar>
        <Link to="/" onClick={handleClickTitle} >
            <Typography
              variant="h6"
              component="p"
              sx={{
                flexGrow: 1,
                fontSize: "1.5rem",
                fontWeight: "bold",
                ml: "2rem",
                color: "white",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer"
              }}
            >
                SchoolsDB
            </Typography>
        </Link>
        
        <Box sx={{marginLeft: "auto", display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Button color="inherit" href="/map">
                Map
              </Button>
              {!loggedIn && pathname !== "/login" && (
                <Button className="logged-out" color="inherit" href="/login">
                  Login
                </Button>
              )}
              {!loggedIn && pathname !== "/signup" && (
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
            </Menu>
          </Box>


        <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" }}}>
          <Button color="inherit" href="/map">
            Map
          </Button>
          {!loggedIn && pathname !== "/login" && (
            <Button className="logged-out" color="inherit" href="/login">
              Login
            </Button>
          )}
          {!loggedIn && pathname !== "/signup" && (
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