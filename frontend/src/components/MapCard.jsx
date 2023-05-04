import React, { Component } from "react";
import { GoogleMap, MarkerF, StreetViewPanorama } from "@react-google-maps/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Link from "@mui/material/Link";

import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc,collection, onSnapshot } from "firebase/firestore";

import Drawerbar from "./DrawerNavBar";
import InfoCard from "./Card";
import Directions from "./Directions";
import SavedSchoolsList from "./SavedSchoolsList";
import AdvanceFilters from "./AdvanceFilters";

import {IoLocationOutline} from "react-icons/io5/index.js"
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { routerPass } from "./routerPass";
import { MapLoader } from "./MapLoader";
import MAutocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";

const MapCard = ({ school, loading }) => {
    if (loading) {
        console.log("loading")
    }
    return (
        <Card elevation={0} sx={{
            backgroundColor: "transparent",
            border: "3px solid rgba(44, 44, 44, 0.15)",
            borderRadius: "13px",
        }}>
            <CardMedia
                sx={{
                    height: 280,
                    m: 2,
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start"
                }}
                image="./src/assets/highschool.png"
                title="school"
            >
                <IconButton size="sm" sx={{ color: "white" }} onClick={() => this.handleSave(school.school_name)}>
                    <BookmarkBorderIcon sx={{ fontSize: "1.7rem" }} />
                </IconButton>
            </CardMedia>
            <CardContent>
                <Typography variant="h6" noWrap textOverflow="ellipsis" sx={{ mb: 1 }}>{school.school_name}</Typography>
                <Typography variant="subtitle1" sx={{
                    display: "flex",
                    alignItems: "center",
                    opacity: "85%",
                    mb: 1
                }}>
                    <IoLocationOutline /> {school.neighborhood}, {school.borough.toLowerCase()}
                </Typography>

                <Typography variant="body1" sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: 500,
                    mb: 1,
                }}>
                    {school.school_accessibility} • {school.school_accessibility}
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <StarIcon sx={{ color: "#fcba03", mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, }}>4.7</Typography>
                    </Box>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MapCard;