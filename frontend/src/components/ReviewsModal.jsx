import React, { Component } from "react";
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

class ReviewsModal extends Component {
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
      review: "",
      buttonDisable: true,
      stars: 0,
      currentDate: date,
      snackbarOpen: false,
      snackbarSuccessOpen: false,
    };
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
      datePosted: this.state.currentDate,
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

    if (this.state.review && this.state.stars) {
      if (!schoolDoc.exists()) {
        await setDoc(snapSchool, {
          ...base,
          user: this.props.user,
          role: this.props.role,
          verified: this.props.verified,
        });

        await updateDoc(doc(db, "users", this.props.uid), {
          reviews: arrayUnion({
            ...base,
            school: this.props.name,
          }),
        });
        this.handleSnackbarSuccessOpen();
      } else {
        this.handleSnackbarOpen();
      }
    } else {
      alert("Invalid Input");
    }
  };

  render() {
    return (
      <>
        <Box
          sx={{
            zIndex: 1000,
            position: "absolute",
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
                  value={this.state.value}
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
              Submitted Review!
            </Alert>
          </Snackbar>
        </Box>
      </>
    );
  }
}

export default ReviewsModal;
