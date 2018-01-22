import React from 'react'


const ShowActivity = ({activity}) => {
  
  return activity ? (
                  <h1>{activity.name}</h1>
              ) : (
                <div>Loading...</div>
              )

}

export default ShowActivity;
