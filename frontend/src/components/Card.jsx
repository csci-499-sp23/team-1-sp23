import React, { Component, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider  from '@mui/material/Divider';
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import './ScrollbarStyle.css'

class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Overview'
        };
        console.log(props)
    };

    render(props) {
        return (
            <Card sx={{
                maxWidth: {xs: "100vw", sm: 400, md: 400},
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
                        {this.props.school.school_name}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                        {this.props.school.neighborhood}, {this.props.school.borough}
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
                        {this.props.school.overview_paragraph}
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{display: "flex"}}>
                                <LanguageIcon sx={{ fontSize: "1.5rem", pr: '20px' }} /> 
                                <Link href={this.props.school.website} underline="none">
                                    {this.props.school.website}
                                </Link>
                            </Grid>
                            <Grid item xs={12} sx={{display: "flex"}}>
                                <AccessTimeIcon sx ={{ fontSize: "1.5rem", pr: '20px' }} /> {this.props.school.start_time + " - " + this.props.school.end_time}
                            </Grid>
                            <Grid item xs={12} sx={{display: "flex"}}>
                                <PhoneIcon sx={{ fontSize: "1.5rem", pr: '20px'}} /> {this.props.school.phone_number}
                            </Grid>
                            <Grid item xs={12} sx={{display: "flex"}}>
                                <LocationOnIcon sx={{ fontSize: "1.5rem", pr: '20px' }} /> {this.props.school.location}
                            </Grid>
                        </Grid>
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
}
export default InfoCard;