import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map'

const test = [{lat:40.719403, lng:-73.996870}, {lat: 43.587332, lng: -110.829230}, {lat:40.772728, lng:-73.983467}]

class MapContainer extends React.PureComponent {
  state = {
    isMarkerShown: true,
    markers: []
  }

  componentDidMount() {
    // grab markers from DB
    this.setState({markers: test})
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
        existingMarkers={this.state.markers}
        currentLocation={{lat: 43.587332, lng: -110.829230}}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

export default MapContainer;
