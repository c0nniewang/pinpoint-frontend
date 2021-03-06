import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const name = this.props.currentUser.name
    const loggedIn = !!name
    const capName = name[0].toUpperCase() + name.slice(1)

    return (
      <div className="ui inverted black menu fixed">
        <a onClick={this.props.returnCurrentLocation} className="item">
          <h2 className="ui header">
            <Link to="/profile/activities">
              <i className="inverted red map pin icon" />
              <div className="content">{this.props.title}</div>
            </Link>
          </h2>
        </a>
        <div className="right menu">
          <a onClick={this.props.returnCurrentLocation} className="right aligned item">
              <Link to="/profile/activities">
                <div className="content">All Activities</div>
              </Link>
          </a>
          {loggedIn ? (<div className="item">Welcome, {capName}</div>) : null}

          <div className="right aligned item">
            <div className="ui floated button" onClick={this.props.handleLogout}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    );
  }

}
