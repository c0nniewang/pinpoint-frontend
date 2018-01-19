import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Map from './Map'
import { fetchCategories, newActivity, fetchActivities } from './Adapter';
import Form from './Form';



const test = [{lat:40.719403, lng:-73.996870}, {lat: 43.587332, lng: -110.829230}, {lat:40.772728, lng:-73.983467}]

class MapContainer extends React.PureComponent {
  state = {
    activities: [],
    markers: [],
    categories: [],
    newMarker: [],
    showForm: false,
  }


  componentDidMount() {
    fetchCategories().then(data => {
      this.setState({
        categories: data
      })
    })

    fetchActivities().then(data => {
      this.setState({
        activities: data
      }, () => this.setMarkers())
    })
  }

  setMarkers = () => {
    const markers = this.state.activities.map(activity => {
      return {lat: activity.lat, lng: activity.long}
    })
    console.log(markers)

    this.setState({
      markers: markers
    })
  }

  handleMarkerClick = (event) => {
    console.log(event.latLng.lat())
    // this.delayedShowMarker()
  }

  renderForm = (marker) => {
    // console.log(marker)
    this.setState({newMarker: marker, showForm: true})
  }

  newActivity = (state) => {
    console.log(this.state.newMarker.position.lat)

    const name = state.nameInput
    const desc = state.descInput
    const cat_id = parseInt(state.currentCat)
    const lat = this.state.newMarker.position.lat
    const long = this.state.newMarker.position.lng
    const user_id = 1
    // fix with authorization

    newActivity(name, desc, cat_id, lat, long, user_id)
    .then(data => this.setState({
      activities: [...this.state.activities, data],
      markers: [...this.state.markers, {lat: data.lat, lng: data.long}]
    })
    ) 
    // render new show view here
  }

  render() {
    console.log(this.state)
    return (
      <div className="ui two column stackable grid">
        <div className="column">
          {this.state.showForm ? <Form newMarker={this.state.newMarker} categories={this.state.categories} newActivity={this.newActivity} /> : <p>Text</p>}
        </div>
        <div className="column">
          <Map
            renderForm={this.renderForm}
            existingMarkers={this.state.markers}
            currentLocation={{lat: 43.587332, lng: -110.829230}}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
      </div>
    )
  }
}

export default MapContainer;
