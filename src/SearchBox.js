import React from 'react';
import ReactDOM from 'react-dom';
const google = window.google;


export default class SearchBox extends React.Component {
  render() {
    return <input ref="input" {...this.props} type="text"/>;
  }

  onPlacesChanged = () => {
    //console.log('show searchbox.getplaces', this.searchBox.getPlaces())
    this.props.updateSearchCenter(this.searchBox.getPlaces());
  }

  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  
  componentWillUnmount() {
    google.maps.event.clearInstanceListeners(this.searchBox);
  }
}
