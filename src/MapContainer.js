import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map'
import { fetchCategories } from './Adapter';
import Form from './Form';



const test = [{lat:40.719403, lng:-73.996870}, {lat: 43.587332, lng: -110.829230}, {lat:40.772728, lng:-73.983467}]

class MapContainer extends React.PureComponent {
  state = {
    isMarkerShown: true,
    markers: [],
    categories: [],
    newMarker: [],
    showForm: false
  }


  componentDidMount() {
    fetchCategories().then(data => {
      this.setState({
        categories: data,
        markers: test
      })
    })
  }

  handleMarkerClick = (event) => {
    // this.setState({ isMarkerShown: false })
    console.log(event.latLng.lat())
    // this.delayedShowMarker()
  }

  renderForm = (marker) => {
    console.log(marker)
    this.setState({newMarker: marker, showForm: true})
  }


  render() {
    return (
      <div className="ui two column stackable grid">
        <div className="column">
          {this.state.showForm ? <Form newMarker={this.state.newMarker} categories={this.state.categories} /> : <p>Text</p>}
        </div>
        <div className="column">
          <Map
            renderForm={this.renderForm}
            existingMarkers={this.state.markers}
            currentLocation={{lat: 43.587332, lng: -110.829230}}
            isMarkerShown={this.state.isMarkerShown}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
      </div>
    )
  }
}

export default MapContainer;
