import { Box, Typography, TextField } from '@mui/material'
import React from 'react'
import {Container, Row, Column, FooterLink, Heading } from '../FooterStyling';
import Schools from "../../assets/schools.json";

console.log(Schools);

export default function HomepageView() {
  return (
    <> 
      <Box className="home-banner">
        <Box sx={{ mt: "10%"}}>
          <Typography variant="h1" component="h1" sx={{
            textAlign: "center", 
            fontSize: "2.25rem", 
            filter: "drop-shadow(1px 1px 5px black)",
            fontWeight: "500"
            }}> 
              The easiest way to find the school best suited for your needs.
          </Typography>
        </Box>
       
        <Box sx={{ mt: "5rem", width: "50%" }}>
          <TextField id="outlined-basic" label="Search for schools" variant="outlined" sx={{ backgroundColor: "white", width: "100%", borderRadius: "5px",}} />
        </Box>
      </Box>
      <Box sx= {{mt: "5%"}}>
        <Container>
          <Row>
            <Column>
              <Heading>Queens</Heading>
              {Schools.map((school, key) => {
                if(school.borocode === "Q")
                {
                  return (
                    <p key={key}>{school.neighborhood}</p>
                  )
                }
              })}
              <FooterLink href="#"></FooterLink>
              <FooterLink href="#"></FooterLink>
              <FooterLink href="#"></FooterLink>
            </Column>
            <Column>
              <Heading>Brooklyn</Heading>
              {Schools.map((school, key) => {
                if(school.borocode === "K")
                {
                  return (
                    <p key={key}>{school.neighborhood}</p>
                  )
                }
              })}
            </Column>
            <Column>
              <Heading>Bronx</Heading>
              {Schools.map((school, key) => {
                if(school.borocode === "X")
                {
                  return (
                    <p key={key}>{school.neighborhood}</p>
                  )
                }
              })}
            </Column>
            <Column>
              <Heading>Manhattan</Heading>
              {Schools.map((school, key) => {
                if(school.borocode === "M")
                {
                  return (
                    <p key={key}>{school.neighborhood}</p>
                  )
                }
              })}
            </Column>
            <Column>
              <Heading>Staten Island</Heading>
              {Schools.map((school, key) => {
                if(school.borocode === "R")
                {
                  return (
                    <p key={key}>{school.neighborhood}</p>
                  )
                }
              })}
            </Column>
          </Row>
        </Container>
      </Box>
    </>
  )
}