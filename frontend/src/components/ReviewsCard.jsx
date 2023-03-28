import React, { Component } from 'react'
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography';

class ReviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: Array.from(this.props.data)
    };
  }
  render() {
    {this.state.data.map((data, key) => {
      return (
        <Box key={key} sx={{ backgroundColor: "red", width: "100%", height: "100%" }}>
          <Rating read-only value={data.stars} />
          <Typography>{data.review}</Typography>
        </Box>
      )
    })}
  }
}


export default ReviewCard
