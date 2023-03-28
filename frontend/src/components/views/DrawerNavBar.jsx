import React from "react";
import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";

export default function Drawerbar({ status, toggle }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Drawer
        open={status}
        onClose={() => toggle(false)}
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
            <ListItem>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItem>
          </a>
          <a href="/profile">
            <ListItem>
              <ListItemIcon>
                <PersonIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItem>
          </a>
          <a href="/map">
            <ListItem>
              <ListItemIcon>
                <MapIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItem>
          </a>
        </List>
      </Drawer>
    </Box>
  );
}
