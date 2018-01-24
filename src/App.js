import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'
import { getCurrentUser } from './Adapter.js'

class App extends Component {
  state = { login: { currentUser: {} } };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      getCurrentUser().then(user => {
        if (!user.error) {
          this.setState({
            login: { currentUser: user}
          }, () => this.props.history.push('/profile/activities'))
        }
      })
    }
  }

  handleLogin = (user) => {
    const currentUser = {currentUser: user}
    localStorage.setItem('token', user.token)
    this.setState({login: currentUser})
  }

  handleLogout = (ev) => {
    this.setState({login: {currentUser: {}} })
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render() {
    console.log('app state', this.state.login)
    return (
      <div className="main">
        <Switch>
          <Route
              exact path="/login"
              render={routerProps => {
                return (
                  <Login 
                  {...routerProps} 
                  handleLogin={this.handleLogin} />
                );
              }}
            />
          <Route
              path="/profile/activities"
              render={routerProps => {
                return (<MapContainer 
                  {...routerProps} 
                  currentUser={this.state.login.currentUser} 
                  handleLogout={this.handleLogout}/>
              )
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
