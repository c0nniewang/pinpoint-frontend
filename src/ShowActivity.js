import React from 'react'


class ShowActivity extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState){
    return (this.props.center !== nextProps.center)
  }

  componentDidUpate(prevProps, PrevState) {
    console.log('in component did update', prevProps)
    if (prevProps.center !== this.props.center) {
      this.props.updateCenter({lat: this.props.activity.lat, lng: this.props.activity.long})
    }
  }

  render(props) {
  const activity = this.props.activity
  console.log(activity)

  // activity ? this.props.updateCenter({lat: activity.lat, lng: activity.long}) : null

  return activity ? (<h1>{activity.name}</h1>) : (<div>Loading...</div>)
  }
}

export default ShowActivity;
