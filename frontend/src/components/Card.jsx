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
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import LinearProgress from '@mui/material/LinearProgress';

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

    handleTab() {

    }

    render() {
        return (
            <Card sx={{
                maxWidth: { xs: "100vw", sm: 400, md: 400 },
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
                        {this.props.school.neighborhood}, {this.props.school.borough === "STATEN IS" ? this.props.school.city : this.props.school.borough}
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mt: 3,
                    }}>
                        {/* <Button>Overview</Button>
                        <Button>Reviews</Button>
                        <Button>About</Button> */}
                        <Tabs>
                            <TabList variant='plain'>
                                <Tab sx = {{fontWeight: "500"}}>Overview</Tab>
                                <Tab sx = {{fontWeight: "500"}}>Reviews</Tab>
                                <Tab sx = {{fontWeight: "500"}}>About</Tab>
                            </TabList>
                            <Divider sx={{
                                    mt: 1,
                                    mb: 2,
                                }} />
                            <TabPanel value={0} sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {this.props.school.overview_paragraph}
                                </Typography>

                                <Divider sx={{
                                    mt: 3,
                                    mb: 2,
                                }} />

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    mt: 3,
                                    mb: 2,
                                }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <LanguageIcon sx={{ fontSize: "1.5rem", pr: '20px' }} />
                                            <Link href={this.props.school.website} underline="none">
                                                {this.props.school.website}
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <AccessTimeIcon sx={{ fontSize: "1.5rem", pr: '20px' }} /> {this.props.school.start_time + " - " + this.props.school.end_time}
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <PhoneIcon sx={{ fontSize: "1.5rem", pr: '20px' }} /> {this.props.school.phone_number}
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
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
                                <Divider sx={{
                                    mt: 2,
                                    mb: 3,
                                }} />
                            </TabPanel>
                            
                            {/* REVIEWS TAB */}
                            <TabPanel value={1} sx={{ p: 2 }}>

                            </TabPanel>
                                
                            {/* ABOUT TAB */}
                            <TabPanel value={2} sx={{ p: 2 }}>
                                <Box>

                                    {/* ACADEMICS */}
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 16, sm: 8, md: 8 }}>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body1" color="text.primary" fontWeight="500">
                                                Academics
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body2" color="text.primary" fontWeight="600">AP Courses</Typography>
                                            {this.props.school.advancedplacement_courses != null ? this.props.school.advancedplacement_courses : "N/A"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body2" color="text.primary" fontWeight="600">Language Courses</Typography>
                                            {this.props.school.language_classes}
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{
                                        mt: 3,
                                        mb: 2,
                                    }} />

                                    {/* SPORTS AND EXTRACURRICULAR */}
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 16, sm: 8, md: 8 }}>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body1" color="text.primary" fontWeight="500">
                                                Sports & Extracurricular Activities
                                            </Typography>                                       
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Boys</Typography>
                                            {this.props.school.psal_sports_boys}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                        <Typography variant="body2" color="text.primary" fontWeight="500">Coed</Typography>
                                            {this.props.school.psal_sports_coed != null ? this.props.school.psal_sports_coed : "No Coed Sports"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Girls</Typography>
                                            {this.props.school.psal_sports_girls}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Extracurricular Activities/Clubs</Typography>
                                            {this.props.school.extracurricular_activities != null ? this.props.school.extracurricular_activities : "N/A" }
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{
                                        mt: 3,
                                        mb: 2,
                                    }} />
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 16, sm: 8, md: 8 }}>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body1" color="text.primary" fontWeight="500">
                                            Accessibility
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8} >
                                            {this.props.school.school_accessibility}
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{
                                        mt: 3,
                                        mb: 2,
                                    }} />

                                    {/* STATISTICS */}
                                    <Grid container spacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 2, sm: 2, md: 2 }} columns={{ xs: 16, sm: 8, md: 8 }}>
                                        <Grid item xs={16} sm={4} md={8} >
                                            <Typography variant="body1" color="text.primary" fontWeight="500">
                                            Statistics
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8}>
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Attendence Rate</Typography>
                                            {Number(this.props.school.attendance_rate) * 100 + "%"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8}>
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Graduation Rate</Typography>
                                            {Number(this.props.school.graduation_rate) * 100 + "%"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8}>
                                            <Typography variant="body2" color="text.primary" fontWeight="500">College Career Rate</Typography>
                                            {Math.round(Number(this.props.school.college_career_rate) * 100) + "%"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8}>
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Saftey</Typography>
                                            {Math.round(Number(this.props.school.pct_stu_safe) * 100) + "%"}
                                        </Grid>
                                        <Grid item xs={16} sm={4} md={8}>
                                            <Typography variant="body2" color="text.primary" fontWeight="500">Diversity</Typography>
                                            {Math.round(Number(this.props.school.pct_stu_enough_variety) * 100) + "%"}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>
                        </Tabs>
                    </Box>

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