import React, { Component } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper'
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating'

import { auth, db } from '../config/firebase'
import { setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

class ReviewsModal extends Component {
    constructor(props) {
        super(props);

        var today = new Date(),
        date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

        this.state = {
            modal: true,
            review: null,
            buttonDisable: true,
            value: 0,
            currentDate: date,
        }
    }

    setValue = (e) => {
        this.setState({
            value: e
        })
    }

    handleChange = (e) => {
        this.setState({
            review: e.target.value,
            buttonDisable: e.target.value.trim() != "" ? false : true
        })
    }

    handleSubmit = async()=> {
        if (this.state.review != null || this.state.stars !=null) {
            await setDoc(doc(db, "reviews", this.props.name), {
                user: this.props.user,
                review: this.state.review,
                role: this.props.role,
                stars: this.state.value,
                uid: this.props.uid,
                datePosted: this.state.currentDate,
            });
            
        }
        else {
            console.log("Can't have empty review!")
        }

    }
    
    render() {
        return (
            <Box sx={{
                zIndex: 1000, 
                position: "absolute",
                left: "50%", 
                top: "50%", 
                transform: "translate(-50%, -50%)",
                maxWidth: 600,
            }}>
                <Paper variant="outlined" sx={{ borderRadius: 4}}>
                    <Grid container spacing={3} sx={{padding: 5, display: "flex", alignItems: "center"}}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" align="center" color="text.secondary">
                                {this.props.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{display: "flex"}}>
                            <Avatar>{this.props.user[0]}</Avatar>
                            <Box sx={{ml: 2}}>
                                <Typography variant="body2" color="text.primary">
                                    {this.props.user + " • " + this.props.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Posting Publicly
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12} textAlign="center">
                            <Rating name="simple-controlled"
                                value={this.state.value}
                                onChange={(event, newValue) => {
                                    this.setValue(newValue);
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="review"
                                name="review"
                                label="Share details of your experience at this school"
                                fullWidth
                                autoComplete="review"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={this.handleChange}
                            />
                        </Grid>     
                        <Grid item xs={12} textAlign="end">
                            <Button size="medium" variant="outlined" onClick={this.props.onClose} >Cancel</Button>
                            <Button size="medium" disabled={this.state.buttonDisable} variant="contained" sx={{ml: 2}} onClick={this.handleSubmit}>Submit</Button>
                        </Grid>               
                    </Grid>
                </Paper>
            </Box>
        )
    }
}

export default ReviewsModal;