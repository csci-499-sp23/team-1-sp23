import React, {useEffect, useState} from "react";
import { useSearchParams, useParams } from "react-router-dom";

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

const NeighborhoodView = () => {
    const { neighborhood } = useParams();
    const [schools, setSchools] = useState({});

    useEffect(() => {
        async function fetchSchools() {
            const response = await fetch(`https://data.cityofnewyork.us/resource/23z9-6uk9.json?neighborhood=${neighborhood}`);
            const data = await response.json();
            setSchools(data);
        }

        fetchSchools();
    }, []);

    return (
        <Box>
            <Typography>Schools around {neighborhood}</Typography>
        </Box>
    )
}

export default NeighborhoodView;