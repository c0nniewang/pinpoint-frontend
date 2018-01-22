import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Map from './Map';
import { fetchCategories, newActivity, fetchActivities } from './Adapter';
import Navbar from './Navbar';
import Form from './Form';
import Activities from './Activities';
import ShowActivity from './ShowActivity';
import { Route, Switch, Link, withRouter } from 'react-router-dom';



const test = [{lat:40.719403, lng:-73.996870}, {lat: 43.587332, lng: -110.829230}, {lat:40.772728, lng:-73.983467}]

class MapContainer extends React.PureComponent {
  state = {
    activities: [],
    markers: [],
    categories: [],
    newMarker: [],
    center: {lat: 43.587332, lng: -110.829230}
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
    this.setState({newMarker: marker})
    console.log(window.history)
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
  }

  updateCenter = (activity) => {
    console.log('this is update callback', activity)
    this.setState({
      center: {lat: activity.lat, lng: activity.long}
    })
  } 

  render() {
    console.log(this.state, this.props)
    return (
      <div>
        <Navbar title={"Pinpoint"} description={"desc here"}/>
        <div className="ui grid container">
          <div className="ui two column stackable grid">
            <div className="column">
              <Switch>
                <Route exact path="/profile/activities" render={({match}) => {
                  console.log(match.activities)
                  return <Activities activities={this.state.activities} />
                }}
                />
                <Route path="/profile/activities/new" render={() => {
                  return <Form
                            newMarker={this.state.newMarker}
                            categories={this.state.categories}
                            newActivity={this.newActivity}
                          />
                  }}
                />
                <Route path="/profile/activities/:id" render={({match}) => {
                  const activity = this.state.activities.find(act => act.id === parseInt(match.params.id))
                  return <ShowActivity activity={activity} center={this.state.center} updateCenter={this.updateCenter}/>
                }}
                />
              </Switch>
            </div>
            <div className="column">
              <Map
                {...this.props}
                renderForm={this.renderForm}
                existingMarkers={this.state.markers}
                center={this.state.center}
                onMarkerClick={this.handleMarkerClick}
              />
            </div>
            <Link to="/profile/activities/new" className="new-activity-form">TESTING DIV</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MapContainer);
