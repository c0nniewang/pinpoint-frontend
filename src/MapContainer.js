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
    currentLocation: {lat:43.519145, lng: -110.841258},
    center: {lat:43.519145, lng: -110.841258},
    zoom: 11,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => this.setState(
      {currentLocation: {lat: position.coords.latitude, lng: position.coords.longitude},
        center: {lat: position.coords.latitude, lng: position.coords.longitude}
      }
    ))

  if (this.props.currentUser.id) {
    fetchCategories().then(data => {
      this.setState({
        categories: data
      })
    })

    const id = this.props.currentUser.id

    fetchActivities(id).then(data => {
        this.setState({
          activities: data.activities
        }, () => this.setMarkers())
    })}
  }

  componentWillReceiveProps() {
    if (this.props.currentUser.id) {
    fetchCategories().then(data => {
      this.setState({
        categories: data
      })
    })

    const id = this.props.currentUser.id

    fetchActivities(id).then(data => {
        this.setState({
          activities: data.activities
        }, () => this.setMarkers())
    })}
  }

  setMarkers = () => {
    const markers = this.state.activities.map(activity => {
      return {lat: activity.lat, lng: activity.long}
    })

    this.setState({
      markers: markers
    })
  }

  renderForm = (event) => {
    const activity = this.state.activities[event]

    if (activity === undefined) {
      this.props.history.push('/profile/activities/new')

    } else {
      this.props.history.push(`/profile/activities/${activity.id}`)
    }
  }

  newActivity = (state) => {

    const name = state.nameInput
    const desc = state.descInput
    const cat_id = parseInt(state.currentCat)
    const lat = this.state.newMarker.lat
    const long = this.state.newMarker.lng
    const user_id = this.props.currentUser.id

    newActivity(name, desc, cat_id, lat, long, user_id)
    .then(data => this.setState({
      activities: [...this.state.activities, data],
      markers: [...this.state.markers, {lat: data.lat, lng: data.long}],
      newMarker: []
    }, () => {
      const id = this.state.activities[this.state.activities.length - 1].id
      this.props.history.push(`/profile/activities/${id}`)
    })
    )
  }

  updateCenter = (activity) => {
   this.setState({
     center: {lat: activity.lat, lng: activity.lng},
     zoom: 13
   })
 }

 updateSearchCenter = (search) => {
  this.setState({
    center: {lat: search[0].geometry.viewport.f.f, lng: search[0].geometry.viewport.b.b},
    newMarker: {lat: search[0].geometry.viewport.f.f, lng: search[0].geometry.viewport.b.b},
    zoom: 13
  })
 }


  handleDelete = e => {
    const activity = this.state.activities.find(act => act.id === e)
    const activities = this.state.activities.filter(act => act.id !== e);
    const markerToDelete = this.state.markers.find( marker => marker.lat === activity.lat && marker.lng === activity.long)
    const markers = this.state.markers.filter(marker => marker !== markerToDelete)

    this.setState({
      activities: activities,
      center: this.state.currentLocation,
      markers: markers,
      zoom: 11})

    deleteActivity(e)
  }

  returnCurrentLocation = e => {
    this.setState({center: this.state.currentLocation, zoom: 11})
  }


  render() {
    console.log("RENDERING")
    return (
      <div>
        <Navbar
        currentUser={this.props.currentUser}
        returnCurrentLocation={this.returnCurrentLocation}
        title={"Pinpoint"}
        description={"desc here"}
        handleLogout={this.props.handleLogout}/>

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
                <div style={{width: '90%', height: '450px'}}>
                  <Map
                    existingMarkers={this.state.markers}
                    currentLocation={this.state.currentLocation}
                    onMarkerClick={this.handleMarkerClick}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    updateSearchCenter={this.updateSearchCenter}
                    newMarker={this.state.newMarker}
                    renderForm={this.renderForm}
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MapContainer);
