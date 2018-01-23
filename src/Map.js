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
        zoom={this.props.zoom}
        onChildClick={(event) => this.props.renderForm(event)}
        >

        <CurrentLocation lat={this.props.currentLocation.lat} lng={this.props.currentLocation.lng} />

        <SearchBox updateSearchCenter={this.props.updateSearchCenter} />
        {this.props.existingMarkers.map((marker, i) => {
          return <MarkerComp key={i} lat={marker.lat} lng={marker.lng} color={"red"}/>
        })}

        <MarkerComp lat={this.props.newMarker.lat} lng={this.props.newMarker.lng} color={"green"} />

      </GoogleMap>
    );
  }
}

export default Map;
