import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import MarkerComp from './MarkerComp.js';
import CurrentLocation from './CurrentLocation';
import SearchBox from './SearchBox';

class Map extends Component {
  static defaultProps = {
    center: {lat: 43.587332, lng: -110.829230},
    zoom: 11
  };

  render() {
    console.log('what is currentLocation', this.props.currentLocation)
    return (
      <GoogleMap
        apiKey={'AIzaSyAmQAIYOMn9ab-TVOpH1VJQyVqxoagNII4'}
        center={this.props.center}
        zoom={this.props.zoom}>

        <CurrentLocation lat={this.props.currentLocation.lat} lng={this.props.currentLocation.lng} />

        <SearchBox />
        {this.props.existingMarkers.map((marker, i) => {
          return <MarkerComp key={i} lat={marker.lat} lng={marker.lng} text={'A'} />
        })}
      </GoogleMap>
    );
  }
}

export default Map;
