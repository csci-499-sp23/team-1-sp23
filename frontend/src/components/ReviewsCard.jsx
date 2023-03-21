import React, { Component } from 'react'
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper'
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating'

class ReviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }
  render() {
    return(
      <Box>
        {console.log(this.props.data)}
      </Box>
    )
  }
}

export default ReviewCard