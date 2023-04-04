import React from "react";
import { Component } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

class Directions extends Component {
  constructor(props) {
    super(props);

    this.def = {
      response: null,
      oriId: null,
      destId: null,
      trvl: null,
    };

    this.state = this.def;

    this.directionsCallback = this.directionsCallback.bind(this);
  }

  directionsCallback(response) {
    if (response !== null) {
      if (response.status === "OK") {
        const oriId = response.geocoded_waypoints.at(0).place_id;
        const destId = response.geocoded_waypoints.at(1).place_id;
        const trvl = response.request.travelMode;
        const legs = response.routes.at(0).legs.at(0);
        if (
          this.state.oriId !== oriId ||
          this.state.destId !== destId ||
          this.state.trvl !== trvl
        ) {
          this.props.modify("dist", legs.distance.text);
          this.props.modify("time", legs.duration.text);
          setTimeout(() => {
            this.setState(() => {
              return {
                response,
                oriId,
                destId,
                trvl,
              };
            });
          }, 50);
        }
      } else {
        console.log("response", response);
      }
    }
  }

  render() {
    return (
      <>
        {this.props.send &&
          this.props.destination &&
          this.props.origin &&
          this.props.travelMode &&
          this.props.opened && (
            <DirectionsService
              options={{
                origin: this.props.origin,
                destination: this.props.destCoor,
                travelMode: this.props.travelMode,
              }}
              callback={this.directionsCallback}
            />
          )}

        {this.state.response &&
          this.props.opened &&
          this.props.card &&
          this.props.send && (
            <DirectionsRenderer
              options={{
                directions: this.state.response,
              }}
              onUnmount={() => {
                this.setState(this.def);
                this.props.modify("send", false);
              }}
            />
          )}
      </>
    );
  }
}

export default Directions;
