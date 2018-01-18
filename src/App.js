import React, { Component } from 'react';
import './App.css';
import MyMapComponent from './MapContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
      <MyMapComponent />
      </div>
    );
  }
}

export default App;
