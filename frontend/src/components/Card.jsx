import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Schools from "../assets/schools.json"

const renderData = () => {
    const latLong = {
        lat: null,
        lng: null,
    }

    const lat = Schools.map(schoolLocationLat => schoolLocationLat.latitude)
    const lng = Schools.map(schoolLocationLnd => schoolLocationLnd.longitude)

    lat.forEach(function(latitude) {
        latLong.lat = latitude
    })
    lng.forEach(function(longitude) {
        latLong.lng = longitude
    })
}

export default function MediaCard() {
    const [schoolsData, setSchoolsState] = React.useState(Schools);
    return (
        <Card sx={{
            maxWidth: 440,
            maxHeight: "100%",
            zIndex: 99,
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "clamp(320px, calc(100vw-90%), 100%)",
            overflowY: "scroll",
            scrollbarGutter: "red",
        }}>
            <CardMedia
                sx={{ height: 190 }}
                image="src/assets/highschool.png"
                title="school"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    School
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {/* {Schools.map((school, id) => {
                        console.log(JSON.parse(JSON.stringify(school)));
                        <p key = {id}>{JSON.parse(JSON.stringify(school.school_name))}</p>
                    })} */}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}