import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider  from '@mui/material/Divider';
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import './ScrollbarStyle.css'

export default function MediaCard(school) { 
    return (
        <Card sx={{
            maxWidth: {xs: "100vw", md: 400},
            maxHeight: "100%",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "clamp(320px, calc(100vw-90%), 100%)",
            overflowY: "auto",
        }}>
            <CardMedia
                sx={{ height: 190 }}
                image="./src/assets/highschool.png"
                title="school"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {school.school.school_name}
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                    {school.school.city}, {school.school.borough}
                </Typography>

                <Box sx = {{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: 3,
                }}>
                    <Button>Overview</Button>
                    <Button>Reviews</Button>
                    <Button>About</Button>
                </Box>

                <Divider sx={{
                    mt: 2,
                    mb: 3,
                }} />

                <Typography variant="body2" color="text.secondary"> 
                    {school.school.overview_paragraph}
                </Typography>

                <Divider sx={{
                    mt: 3,
                    mb: 2,
                }} />

                <Box sx = {{
                    display: "flex",
                    flexDirection: "column",
                    mt: 3,
                    mb: 2,
                }}>
                    <LanguageIcon  sx = {{fontSize: "1.5rem"}}/> <Link href = {school.school.website} underline="none">{school.school.website}</Link>
                    <PhoneIcon sx = {{fontSize: "1.5rem"}}/> {school.school.phone_number}
                    <LocationOnIcon sx = {{fontSize: "1.5rem"}}/> {school.school.location}
                </Box>

                
                <Divider sx={{
                    mt: 3,
                    mb: 2,
                }} />

                <Typography variant="h6" color="text.primary">
                    Reviews
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
