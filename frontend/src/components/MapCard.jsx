import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";


import { auth, db } from "../config/firebase";
import { doc,collection, updateDoc } from "firebase/firestore";

import {IoLocationOutline} from "react-icons/io5/index.js"
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark"

import { Typography } from "@mui/material";

function MapCard ({ school, loading, openCard, goToSchool, savedSchools, saveSchool }) {
    const handleSave = (schoolName) => {
        if(!savedSchools.includes(schoolName)) {
            saveSchool(schoolName)
        }
        else {
            const docRef = doc(db, 'users', auth.currentUser.uid)
            const removedSchool = savedSchools.filter(
                school => school !== schoolName
            )
            return updateDoc(docRef, {
                saved_schools: removedSchool
            })
        }
    }

    const onClickEvent = () => {
        openCard(true, school)
        goToSchool(Number(school.longitude), Number(school.latitude), school)
    }
    if (loading) {
        console.log("loading")
    }
    return (
        <Card elevation={0} sx={{
            backgroundColor: "transparent",
            border: "3px solid rgba(44, 44, 44, 0.15)",
            borderRadius: "13px",
            cursor: "pointer",
            zIndex: 1,
        }}
        onClick={() => onClickEvent()}
        >
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
                <IconButton size="sm" sx={{ color: "white", zIndex: 20 }} onClick={() => handleSave(school.school_name)}>
                     {savedSchools.includes(school.school_name) ? <BookmarkIcon sx={{color: "#2196f3"}}/> : <BookmarkBorderIcon /> }
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
                    <IoLocationOutline /> {school.neighborhood}, {school.borough.toLowerCase()
                        .split(" ")
                        .map((word) => word.replace(/^./, (c) => c.toUpperCase()))
                        .join(" ")}
                </Typography>

                <Typography variant="body1" sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: 500,
                    mb: 1,
                }}>
                    <Button variant="contained" sx={{color: "red"}}>
                        <Link to={`/school/${school.school_name}`} state={{ school: school }} style={{
                            textDecoration: "none",
                            color: "white",
                        }}>
                            Go To School's Page
                        </Link>
                    </Button>
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
