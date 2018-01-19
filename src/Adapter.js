export const fetchCategories = () => {
  return fetch('http://localhost:3001/api/v1/categories')
  .then(resp => resp.json())
}
