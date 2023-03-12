import { Component } from "react"
import MapView from "../views/MapView"


import schools from "../../assets/schools.json"

class MapContainer extends Component {
  componentDidMount() {
    this.props.schools;
  }
  render() {
    return(
      <MapView 
        schools = {this.props.schools}
      />
    )
  }
}

// const MapContainer = () => {
//   return (
//     <> 
//       <MapView />
//     </>
//   )
// }

export default MapContainer
