import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'

class App extends Component {
  render() {
    return (
      <div className="ui grid container">
        <MapContainer />
      </div>
    );
  }
}

export default App;
