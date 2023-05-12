import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { IoLocationOutline } from "react-icons/io5/index.js";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { Typography } from "@mui/material";

function MapCard({ school, loading, openCard, goToSchool }) {
  const onClickEvent = () => {
    openCard(true, school);
    goToSchool(Number(school.longitude), Number(school.latitude), school);
  };
  if (loading) {
    console.log("loading");
  }

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow:
          "0px 0.4px 0.5px hsl(0deg 0% 52% / 0.35),0px 1.7px 2.1px -0.6px hsl(0deg 0% 52% / 0.41),0px 4px 4.9px -1.2px hsl(0deg 0% 52% / 0.47),0.1px 9.4px 11.5px -1.8px hsl(0deg 0% 52% / 0.53)",
        borderRadius: "13px",
        cursor: "pointer",
      }}
      onClick={() => onClickEvent()}
    >
      <CardMedia
        sx={{
          height: 180,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
        image={`/school-images/${school.dbn}.png`}
        title={school.school_name}
      ></CardMedia>
      <CardContent sx={{ position: "relative" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" noWrap textOverflow="ellipsis">
            {school.school_name}
          </Typography>
          <IconButton
            size="sm"
            onClick={() => this.handleSave(school.school_name)}
          >
            <BookmarkBorderIcon sx={{ fontSize: "1.7rem" }} />
          </IconButton>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            opacity: "85%",
            mb: 1,
          }}
        >
          <IoLocationOutline />
          <Typography noWrap textOverflow="ellipsis">
            {school.neighborhood + ", "}
            {school.borough
              .toLowerCase()
              .split(" ")
              .map((word) => {
                if (word == "is") {
                  word += "land";
                  return word.replace(/[a-z]/, (l) => l.toUpperCase());
                } else {
                  return word.replace(/[a-z]/, (l) => l.toUpperCase());
                }
              })
              .join(" ")}
          </Typography>
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1.5,
            mb: 1,
          }}
        >
          <Button variant="contained" sx={{ height: 30, overflow: "hidden" }}>
            <Link
              to={`/school/${school.school_name}`}
              state={{ school: school }}
            >
              <Typography sx={{ color: "white" }} noWrap>
                Learn More
              </Typography>
            </Link>
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StarIcon sx={{ color: "#fcba03", mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              4.7
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MapCard;
