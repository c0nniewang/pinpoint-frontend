import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  state = { login: { currentUser: {} } };

  handleLogin = (user) => {
    const currentUser = {currentUser: user}
    localStorage.setItem('token', user.id)
    this.setState({login: currentUser})
  }

  handleLogout = (ev) => {
    console.log(ev)
    this.setState({login: {currentUser: {}} })
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="main">
        <Switch>
          <Route
              exact path="/login"
              render={routerProps => {
                return (
                  <Login {...routerProps} handleLogin={this.handleLogin} />
                );
              }}
            />
          <Route
              path="/profile/activities"
              render={routerProps => {
                return (<MapContainer {...routerProps} currentUser={this.state.login.currentUser} handleLogout={this.handleLogout}/>
              )
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
