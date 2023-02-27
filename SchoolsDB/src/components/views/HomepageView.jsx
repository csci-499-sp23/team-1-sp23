import { Box, Typography, TextField } from '@mui/material'
import React from 'react'

export default function HomepageView() {
  return (
    <> 
      <Box className="home-banner">
        <Box sx={{ mt: "10%"}}>
          <Typography variant="h1" component="h1" sx={{ textAlign: "center", fontSize: "2.25rem", filter: "drop-shadow(1px 1px 5px black)"}}> 
            The easiest way to find the school best suited for your needs.
          </Typography>
        </Box>
       
        <Box sx={{ mt: "5rem", width: "50%" }}>
          <TextField id="outlined-basic" label="Search" variant="outlined" sx={{ backgroundColor: "white", width: "100%", borderRadius: "5px",}} />
        </Box>
      </Box>
    </>
  )
}
