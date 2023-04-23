import React, { Component } from 'react'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { db } from "../config/firebase";
import { setDoc, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

class Edit extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getMonth() +
        1 +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear();

    this.state = {
      modal: true,
      review: null,
      buttonDisable: true,
      stars: this.props.rating,
      currentDate: date,
      snackbarOpen: false,
      snackbarSuccessOpen: false,
    }
  }

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true,
    });
  };

  handleSnackbarSuccessOpen = () => {
    this.setState({
      snackbarSuccessOpen: true,
    });
  };

  handleSnackbarClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackbarOpen: false,
      snackbarSuccessOpen: false,
    });
  };

  setValue = (e) => {
    this.setState({
      stars: e,
    });
  };

  handleChange = (e) => {
    this.setState({
      review: e.target.value,
      buttonDisable: e.target.value.trim() != "" ? false : true,
    });
  };


  handleSubmit = async () => {
    const base = {
      content: this.state.review,
      datePosted: this.props.date,
      stars: this.state.stars,
    };

    const snapSchool = doc(
      db,
      "school",
      this.props.name,
      "reviews",
      this.props.uid
    );

    const schoolDoc = await getDoc(snapSchool);

    if (this.state.review != null || this.props.currentReview || (this.state.stars != null || undefined || this.props.rating)) {
      if (schoolDoc) {
        await updateDoc(snapSchool, {
          ...base,
          edited: this.state.currentDate,
        });

        const querySnapshot = await getDoc(doc(db, "users", this.props.uid));
        if (querySnapshot.exists()) {
          {/*        
          this is a really bad way to edit reviews but this is the 
          only way i could think of as of now
          so im writing down whats going on here 
          
          first getting ALL user reviews through:
            const reviews = querySnapshot.data().reviews
          
          then filtering through all the reviews and removing 
          the review that is going to be edited.
          
          then adding the edited review into editedReview then updating the doc
        */}
          
          const reviews = querySnapshot.data().reviews

          const editedReview = {
            content: this.state.review,
            datePosted: this.props.date,
            school: this.props.name,
            stars: this.state.stars != this.props.rating ? this.state.stars : this.props.rating,
          }
          const removeReview = reviews.filter(
            review => review.school !== this.props.name
          )

          removeReview.unshift(editedReview)
          console.log(removeReview)

          updateDoc(doc(db, "users", this.props.uid), {
            reviews: removeReview
          })
        }
        else {
          console.log("error")
        }
        this.handleSnackbarSuccessOpen();
      } 
      else {
        console.log(schoolDoc.data())
        this.handleSnackbarOpen()
      }
    }
  };

  render() {
    return (
      <>
        <Box
          sx={{
            zIndex: 1000,
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 600,
          }}
        >
          <Paper variant="outlined" sx={{ borderRadius: 4 }}>
            <Grid
              container
              spacing={3}
              sx={{ padding: 5, display: "flex", alignItems: "center" }}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h6" align="center" color="text.secondary">
                  {this.props.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <Avatar>{this.props.user[0]}</Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body2" color="text.primary">
                    {this.props.user + " • " + this.props.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posting Publicly
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} textAlign="center">
                <Rating
                  name="simple-controlled"
                  value={this.state.stars}
                  onChange={(event, newValue) => {
                    this.setValue(newValue);
                  }}
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
                  defaultValue={this.props.currentReview}
                  multiline
                  rows={4}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} textAlign="end">
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={this.props.onClose}
                >
                  Cancel
                </Button>
                <Button
                  size="medium"
                  disabled={this.state.buttonDisable}
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
          >
            <Alert onClose={this.handleSnackbarClose} severity="error">
              You already submitted a review for this school!
            </Alert>
          </Snackbar>

          <Snackbar
            open={this.state.snackbarSuccessOpen}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
          >
            <Alert onClose={this.handleSnackbarClose} severity="success">
              Edited Review!
            </Alert>
          </Snackbar>
        </Box>
      </>
    );
  }

}

export default Edit