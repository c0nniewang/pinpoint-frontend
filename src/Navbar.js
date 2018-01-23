import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="ui inverted black menu fixed">
        <a onClick={this.props.returnCurrentLocation} className="item">
          <h2 className="ui header">
            <Link to="/profile/activities">
              <i className="inverted white map pin icon" />
              <div className="content">{this.props.title}</div>
            </Link>
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
