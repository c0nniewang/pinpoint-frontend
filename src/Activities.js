import React from 'react';
import { Link } from 'react-router-dom';


const Activities = (props) => {
  return <div className="ui cards">
    <h1>Your Saved Activites</h1>
    {props.activities.map((act, i) => {
      return  <div className="card" key={i} onClick={() => props.updateCenter({lat: act.lat, lng: act.long})}>
                <div className="content">
                  <Link to={`/profile/activities/${act.id}`}><div className="header">{act.name}</div></Link>
                    <div className="meta">{act.category_name}</div>
                    <div className="description">{act.description}</div>
                </div>
              </div>
    })}
  </div>
}


export default Activities;
