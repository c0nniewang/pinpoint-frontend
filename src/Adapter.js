export const fetchCategories = () => {
  return fetch('http://localhost:3001/api/v1/categories')
  .then(resp => resp.json())
}

export const newActivity = (name, desc, cat_id, lat, long, user_id) => {
  return fetch('http://localhost:3001/api/v1/activities', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name, 
      description: desc, 
      lat: lat,
      long: long,
      completed: false,
      category_id: cat_id,
      user_id: user_id})
  }).then(resp => resp.json())
}

export const fetchActivities = () => {
  return fetch(`http://localhost:3001/api/v1/activities`)
  .then(resp => resp.json())
}
