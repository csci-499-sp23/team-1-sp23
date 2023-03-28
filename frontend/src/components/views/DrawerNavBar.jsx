import React from "react";
import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

export default function Drawerbar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Drawer
        anchor="left"
        variant="temporary"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 60,
            boxSizing: "border-box",
            backgroundColor: "#2b2d42",
            color: "white",
          },
        }}

      >
        <List>
         <a href="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon sx={{color: 'white'}}/>
            </ListItemIcon>
          </ListItem>
          </a>
          <a href="/profile">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon sx={{color: 'white'}} />
            </ListItemIcon>
          </ListItem>
          </a>
          <a href="/map">
          <ListItem button>
            <ListItemIcon>
              <MapIcon sx={{color: 'white'}} />
            </ListItemIcon>
          </ListItem>
          </a>
        </List>
      </Drawer>
    </Box>
  );
}
