import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';

export default function Drawerbar() {
  return (
    <Box sx={{ width: "100%" }}>
      <Drawer
        variant="permanent"
        open={open}
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
          <ListItem button>
            <ListItemIcon>
              <HomeIcon sx={{color: 'white'}} />
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon sx={{color: 'white'}} />
            </ListItemIcon>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MapIcon sx={{color: 'white'}} />
            </ListItemIcon>
            
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
