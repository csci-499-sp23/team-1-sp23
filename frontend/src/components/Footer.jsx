import React from 'react'
import { FooterBox, Container, Row, Column, FooterLink, Heading } from './FooterStyling';

import Schools from "../assets/schools.json";

const Footer = () => {
  return (
    <FooterBox>
      <Container>
        <Row>
          <Column>
            <Heading>Queens</Heading>
            <FooterLink href="#"></FooterLink>
            <FooterLink href="#"></FooterLink>
            <FooterLink href="#"></FooterLink>
          </Column>
          <Column>
            <Heading>Brooklyn</Heading>
          </Column>
          <Column>
            <Heading>Bronx</Heading>
            {Schools.map((school, key) => {
              return(
                <p key={key}>{school.neighborhood}</p>
              )
            })}
          </Column>
          <Column>
            <Heading>Manhattan</Heading>
          </Column>
          <Column>
            <Heading>Staten Island</Heading>
          </Column>
        </Row>
      </Container>
  </FooterBox>
  )
}

export default Footer
