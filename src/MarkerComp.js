import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MarkerComp = (props) => {
  return <Marker position={props.properties} onClick={props.onMarkerClick} />
}



export default MarkerComp;
