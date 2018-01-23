import React from 'react';

export default class MarkerComp extends React.Component {
  render() {
    return (
      <i className={`big ${this.props.color} basic pin icon`}/>
    );
  }
}
