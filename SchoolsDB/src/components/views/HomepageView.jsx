import React from 'react'
import { Container, Box, styled, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MButton = styled(Button)(() => ({
  marginTop: "2em",
}));

const HomepageView = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: "5em", minWidth: "300px" }}>
      <Box>
        <Typography component="h1" variant="h3">
          Welcome to the Campus Management System
        </Typography>
      </Box>

      <Box sx={{ mt: "2em" }}>
        <Typography component="div" variant="h6">
          Easily manage all students across different campuses.
        </Typography>

        <Typography paragraph m="3em">
          Choose one of the following options to get started.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: "3em",
            flexWrap: "wrap",
          }}
        >
          <MButton component={Link} to="/campuses" variant="contained">
            All Campuses
          </MButton>
          <MButton component={Link} to="/students" variant="contained">
            All Students
          </MButton>
        </Box>
      </Box>
    </Container>
  );
};

export default HomepageView