import React from 'react';
import { Link } from 'react-router-dom';


const Activities = (props) => {
  return <div className="ui cards">
    {props.activities.map(act => {
      return  <div className="card" onClick={() => props.updateCenter({lat: act.lat, lng: act.long})}>
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
