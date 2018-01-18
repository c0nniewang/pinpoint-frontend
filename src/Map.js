import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerComp from './MarkerComp'


const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, width: `75%`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.currentLocation}
  >
    {console.log(props)}
    {props.markers.map(marker => <MarkerComp properties={marker}/>)}
    // {props.isMarkerShown && <MarkerComp />}
  </GoogleMap>
)

export default Map;
