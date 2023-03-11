import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(school) {    
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
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo eligendi dolorem dolorum corporis doloremque quas quis, blanditiis autem dolore cupiditate asperiores temporibus vitae nihil illo? Beatae consequatur libero hic omnis.
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
