import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerComp from './MarkerComp'
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
const google = window.google
const _ = require("lodash");

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, width: `100%`}} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {lat: 43.587332, lng: -110.829230},
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          // console.log('places looks like', places[0])
          const nextMarkers = places.map(place => ({
            position: {lat: place.geometry.viewport.f.f, lng: place.geometry.viewport.b.b}
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={props.currentLocation}
    center={props.center}
  >
  
  {props.existingMarkers.map((marker, index) => <MarkerComp key={index} properties={marker} onMarkerClick={props.onMarkerClick}/>)}

  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={google.maps.ControlPosition.TOP_LEFT}
    onPlacesChanged={props.onPlacesChanged}
  >
    <input
      type="text"
      placeholder="Search Here"
      style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        marginTop: `10px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
      }}
    />
  </SearchBox>
    {props.markers[0] ?
        <MarkerWithLabel
          onClick={() => props.renderForm(props.markers[0])}
          position={{...props.markers[0].position}}
          labelAnchor={new google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: "white", fontSize: "17px", padding: "10px"}}
        >
          <div>Add New Activity</div>
        </MarkerWithLabel>
        : null}
  </GoogleMap>
)

export default Map;
