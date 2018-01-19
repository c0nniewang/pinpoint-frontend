import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="ui inverted black menu">
        <a className="item">
          <h2 className="ui header">
            <i className="paint brush" />
            <div className="content">{this.props.title}</div>
          </h2>
        </a>
        <div className="right aligned item">
          <div className="ui floated button">
            Log In / Out
          </div>
        </div>
      </div>
    );
  }

}
