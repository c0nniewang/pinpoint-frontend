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
    categories: []
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

  renderForm = (event) => {

  }


  render() {
    return (
      <div className="ui two column stackable grid">
        <div className="column">
          <Form categories={this.state.categories}/>
        </div>
        <div className="column">
          <Map
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
