import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  state = { login: { currentUser: {} } };

  handleLogin = (user) => {
    const currentUser = {currentUser: user}
    localStorage.setItem('token', 1)
    this.setState({login: currentUser})
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
              path="/profile"
              render={() => {<MapContainer />}}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
