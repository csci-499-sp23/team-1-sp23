import React from "react";
import { Component } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

class Directions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
    };

    this.directionCallback = this.directionCallback.bind(this);
  }

  directionCallback(response) {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => {
          response;
        });
      } else {
        console.log("response", response);
      }
    }
  }

  render() {
    return (
      <>
        {this.props.destination && this.props.origin && (
          <DirectionsService
            options={{
              destination: this.props.destination,
              origin: this.props.origin,
              travelMode: this.props.travelMode,
            }}
            callback={this.directionsCallback}
          />
        )}

        {this.state.response && (
          <DirectionsRenderer
            options={{
              directions: this.state.response,
            }}
          />
        )}
      </>
    );
  }
}

export default Directions;
