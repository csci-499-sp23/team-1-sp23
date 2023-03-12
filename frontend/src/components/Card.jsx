import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
                image="src/assets/highschool.png"
                title="school"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {school.school.school_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, sapiente quia similique excepturi unde deserunt odio aut totam quo incidunt ex, commodi alias saepe error iste molestias veritatis nihil earum.
                    Odio autem totam quibusdam delectus corrupti dolor similique magni nostrum laborum natus quam doloribus reprehenderit, maxime quis aliquid officiis est numquam placeat voluptatum illo eos necessitatibus veniam. Ipsum, soluta dolorum.
                    Et reiciendis quia culpa vero magnam, debitis totam corporis inventore in itaque rem omnis sed eius enim quas facilis autem voluptate nam maxime placeat quisquam dolores blanditiis recusandae? Delectus, numquam.
                    Tempora neque rem molestias sunt iusto sed officia eaque voluptatum, dolor aliquid ipsam eveniet inventore totam recusandae praesentium nihil saepe similique odit amet delectus suscipit doloribus omnis quo eius. Harum.
                    Odit, enim pariatur voluptate exercitationem doloremque amet ex nesciunt, voluptatibus facere inventore dicta alias quibusdam similique deserunt porro praesentium. Doloremque blanditiis iste beatae dolore et. Pariatur beatae distinctio sapiente sunt.
                    Numquam repellat perspiciatis quae. Ex reiciendis dolore quo earum odit animi, ad, quos eius libero dignissimos molestiae quod eligendi quia expedita hic at! Rem in recusandae deleniti iste sapiente numquam.
                    Alias incidunt saepe labore temporibus dolorum veniam vero corrupti excepturi hic provident eos natus aliquid at ducimus accusamus minima facere reiciendis deleniti quae magnam facilis, sapiente laboriosam? Est, deserunt doloremque.
                    At consequatur nulla sapiente possimus labore ipsum laudantium cumque ad, neque architecto accusamus dignissimos? Aspernatur soluta molestiae dolor eveniet ipsam quod odit architecto? Rem ab nemo architecto numquam, fugiat hic.
                    Ipsa, iusto rem. Esse sunt modi molestias eum, ut beatae suscipit temporibus nemo iure nam ipsam sint recusandae dolorem velit harum placeat consectetur nisi veniam libero animi. Vitae, ratione omnis?
                    Illum animi itaque porro commodi voluptatum, inventore nemo cumque ratione, magni corporis natus labore suscipit fugiat tenetur autem veritatis libero dignissimos asperiores maiores beatae quibusdam. Consectetur aliquam ea aliquid soluta!
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
