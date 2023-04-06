import React, {useEffect, useState} from "react";
import { useSearchParams, useParams } from "react-router-dom";

import {
    GoogleMap,
    useJsApiLoader,
    LoadScript,
    Marker
} from "@react-google-maps/api";
import { mK } from "../../config/environment";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Navbar from "./NavBar";

const containerStyle = {
    width: "100%",
    height: "100dvh",
};


const center = {
    lat: 40.702944,
    lng: -73.89347,
  };

const lib = ["places"];

const NeighborhoodView = () => {
    const { neighborhood } = useParams();
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        async function fetchSchools() {
            const response = await fetch(`https://data.cityofnewyork.us/resource/23z9-6uk9.json?neighborhood=${neighborhood}`);
            const data = await response.json();
            setSchools(data);
        }

        fetchSchools();
    }, []);

    return (
        <>
        <Navbar/>
        <Grid container columns={{ xs: 4, sm: 8, md: 16 }}>
            <Grid item xs={8}>
                <Box sx={{m: 10}}>
                    <Typography variant="h4" fontWeight="400">Highschools around {neighborhood}</Typography>

                    <Box sx={{mt: 5}}>
                        {schools.map((school, key) => {
                            console.log(school);
                            return <Typography key={key} variant="body1" sx={{mt: 1}}>{school.school_name}</Typography>
                        })}
                    </Box>
                    {/* <Box sx={{mt: 5}}>
                        <Typography variant="h4" fontWeight="400">Homes for sale/rent around {neighborhood}</Typography>
                    </Box> */}
                </Box>
            </Grid >
            <Grid item xs={8} sx={{
                position: "fixed", 
                top: 0, 
                right: 0, 
                height: "100%", 
                width: "100%"
            }}>
                <LoadScript googleMapsApiKey={mK} libraries={lib}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                        clickableIcons={false}
                        options={{
                            zoomControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        {schools.map((school, key) => {
                            return (
                                <Marker
                                    key={key}
                                    position={{
                                        lat: Number(school.latitude),
                                        lng: Number(school.longitude),
                                    }}
                                />)
                        })}
                    </GoogleMap>
                </LoadScript>
            </Grid>
        </Grid>
        </>
    )

}

export default NeighborhoodView;