import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./navbarStyling.css"


const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed" style={{ background: '#2b2d42' }}>
        <Toolbar>
          {/* <IconButton */}
          {/*   size="large" */}
          {/*   edge="start" */}
          {/*   color="inherit" */}
          {/*   aria-label="menu" */}
          {/*   sx={{ mr: 2 }} */}
          {/* > */}
          {/*   <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography variant="h1" component="div"  sx={{ flexGrow: 1, fontSize: "1.5rem", fontWeight:"bold", ml: "2rem" }}>
            SchoolsDB
          </Typography>
          <div>
            <Button color="inherit">Map</Button>
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
