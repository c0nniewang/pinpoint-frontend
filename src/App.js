import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import Navbar from './Navbar'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar title={"Pinpoint"} description={"desc here"}/>
          <div className="ui grid container">
            <MapContainer />
          </div>
      </div>
    );
  }
}

export default App;
