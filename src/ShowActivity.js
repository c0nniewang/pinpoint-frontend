import React from 'react'
import { Link } from 'react-router-dom'


<<<<<<< HEAD
const ShowActivity = ({activity, handleDelete}) => {
=======
const ShowActivity = ({activity}) => {
  
>>>>>>> 0d5ac7ad84acf4d05798f9a351b5eed54dec0a0c
  return activity ? (
                <div>
                  <h1>{activity.name}</h1>
                  <h3>{activity.category_name}</h3>
                  <p>{activity.description}</p>
                  <div className="ui button basic blue">
                    <i className="edit icon" />
                    Edit
                  </div>
                  <div onClick={() => handleDelete(activity.id)} className="ui button basic red">
                    <i className="trash icon" />
                    Delete
                  </div>
                </div>
              ) : (
                <div>
                  <h2>Your activity has been deleted!</h2>
                  <Link to="/profile/activities">
                    <button className="ui button">Back to Activities</button>
                  </Link>
                </div>
              )

}

export default ShowActivity;
