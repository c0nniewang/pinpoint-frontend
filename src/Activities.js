import React from 'react';
import { Link } from 'react-router-dom';


const Activities = (props) => {
  return <div className="ui cards">
    {props.activities.map(act => {
      console.log('this is what act is', act)
      return
              <div className="card">
                  <div className="content">
                      <div className="header">
                        {act.name}
                      </div>
                      <div className="meta">{act.category_name}</div>
                      <div className="description">{act.description}</div>
                  </div>
              </div>
    })}
  </div>
}


export default Activities;
