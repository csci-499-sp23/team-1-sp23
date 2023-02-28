import React from 'react'
import { Box, Container, Row, Column, FooterLink, Heading } from './FooterStyling';

const Footer = () => {
  return (
    <Box>
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

          </Column>
          <Column>
            <Heading>Manhattan</Heading>
          </Column>
          <Column>
            <Heading>Staten Island</Heading>
          </Column>
        </Row>
      </Container>
  </Box>
  )
}

export default Footer
