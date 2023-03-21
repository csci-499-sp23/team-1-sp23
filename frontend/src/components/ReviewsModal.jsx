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

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

class ReviewsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        }
    }

    handleClose = (bool) => {
        this.setState({
            modal: bool,
        })
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
                        <Grid item xs={12} md={12} textAlign="center">
                            <StarBorderOutlinedIcon
                                fontSize="1.7rem"
                                sx={{ color: "text.secondary", fontSize: "1.7rem" }}
                            />
                            <StarBorderOutlinedIcon
                                fontSize="1.7rem"
                                sx={{ color: "text.secondary", fontSize: "1.7rem" }}
                            />
                            <StarBorderOutlinedIcon
                                sx={{ color: "text.secondary", fontSize: "1.7rem" }}
                            />
                            <StarBorderOutlinedIcon
                                fontSize="1.7rem"
                                sx={{ color: "text.secondary", fontSize: "1.7rem" }}
                            />
                            <StarBorderOutlinedIcon
                                fontSize="1.7rem"
                                sx={{ color: "text.secondary", fontSize: "1.7rem" }}
                            />
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
                            />
                        </Grid>     
                        <Grid item xs={12} textAlign="end">
                            <Button size="medium" variant="outlined" >Cancel</Button>
                            <Button size="medium" variant="contained" sx={{ml: 2}}>Submit</Button>
                        </Grid>               
                    </Grid>
                </Paper>
            </Box>
        )
    }
}

export default ReviewsModal;