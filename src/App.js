import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer'
import FormContainer from './FormContainer'

class App extends Component {
  render() {
    return (
      <div className="ui grid container">
        <div className="sixteen wide column">
          <FormContainer />
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
