import React from "react";
import { fetchCategories, newActivity, fetchActivities, deleteActivity } from './Adapter';
import Navbar from './Navbar';
import Form from './Form';
import Activities from './Activities';
import ShowActivity from './ShowActivity';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Map from './Map.js'


class MapContainer extends React.PureComponent {
  state = {
    activities: [],
    markers: [],
    categories: [],
    newMarker: [],
<<<<<<< HEAD
    center: {lat: 43.587332, lng: -110.829230}
=======
    currentLocation: {lat:43.519145, lng: -110.841258},
    center: {lat:43.519145, lng: -110.841258},
    zoom: 11,
>>>>>>> google-maps-react
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
    console.log('logging all markers', markers)

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
    }, () => {
      const id = this.state.activities[this.state.activities.length - 1].id
      this.props.history.push(`/profile/activities/${id}`)
    })
    )
  }

  updateCenter = (activity) => {
   console.log('this is update callback', activity)
   this.setState({
     center: {lat: activity.lat, lng: activity.lng},
     zoom: 13
   })
 }


  handleDelete = e => {
    const activities = this.state.activities.filter(act => act.id !== e);
    this.setState({activities: activities})
    deleteActivity(e)
  }

  returnCurrentLocation = e => {
    this.setState({center: this.state.currentLocation, zoom: 11})
  }


  render() {
    console.log(this.state, this.props)
    return (
      <div>
        <Navbar returnCurrentLocation={this.returnCurrentLocation} title={"Pinpoint"} description={"desc here"}/>
        <div className="ui grid container">
          <div className="ui two column stackable grid">
            <div className="column">
              <Switch>
                <Route exact path="/profile/activities" render={({match}) => {
                  return (<Activities activities={this.state.activities}
                                     updateCenter={this.updateCenter}
                                     zoom={this.state.zoom}
                           />)
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
                  return <ShowActivity activity={activity} handleDelete={this.handleDelete} />
                }}
                />
              </Switch>
            </div>
            <div className="column">
              <div style={{width: '100%', height: '500px'}}>
                <Map
                  existingMarkers={this.state.markers}
                  currentLocation={this.state.currentLocation}
                  onMarkerClick={this.handleMarkerClick}
                  center={this.state.center}
                  zoom={this.state.zoom}
                />
              </div>
            </div>
            <Link to="/profile/activities/new" className="new-activity-form">TESTING DIV</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MapContainer);
