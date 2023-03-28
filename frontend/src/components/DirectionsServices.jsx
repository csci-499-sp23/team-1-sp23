import React from 'react'
import { Component } from 'react';
import Box from '@mui/material/Box'
import { DirectionsService } from '@react-google-maps/api';

class Directions extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      response: null,
      travelMode: 'Driving',
      origin: '',
      destination: this.props.school,
    }
    this.directionCallback = this.directionCallback.bind(this)
    this.getOrigin = this.getOrigin.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMapClick = this.onMapClick.bind(this)
  }

  directionCallback(response) {
    console.log(response)
    
    if(response !== null) {
      if(response.status === "OK") {
        this.setState(() => {
          response
        })
      }
      else {
        console.log('response', response)
      }
    }
  }

  getOrigin(ref) {
    this.origin = ref
  }
  
  
  onClick () {
    if (this.origin.value !== '' && this.destination.value !== '') {
      this.setState(
        () => ({
          origin: this.origin.value,
          destination: this.destination.value
        })
      )
    }
  }

  onMapClick (...args) {
    console.log('onClick args: ', args)
  }

  render() {
    return(
      <Box></Box>
    )
  }
}

export default DirectionsService