import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map'


class MapContainer extends React.PureComponent {
  state = {
    isMarkerShown: true,
    markers: []
  }

  componentDidMount() {
    // grab markers from DB
  }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }

  handleMarkerClick = (event) => {
    // this.setState({ isMarkerShown: false })
    console.log(event.latLng.lat())
    // this.delayedShowMarker()
  }

  render() {
    return (
      <Map
        currentLocation={{lat: 43.587332, lng: -110.829230}}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MapContainer;
