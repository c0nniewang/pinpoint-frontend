import React from 'react';
import { fetchCategories } from './Adapter';

const Form = (props) => {
  const categories = props.categories.map(cat => {
    return <option value={cat.id}>{cat.name}</option>
  })

  return (
      <form class="ui form">
          <h4 class="ui dividing header">New Activity</h4>
            <div class="field">
              <label>Name</label>
                  <div class="field">
                    <input type="text" name="shipping[first-name]" />
                  </div>
            </div>
            <div class="field">
              <label>Description</label>
                  <div class="field">
                    <textarea></textarea>
                  </div>
            </div>
            <div class="field">
              <label>Category</label>
              <select class="ui fluid dropdown">
                <option value="">Select Category</option>
                {categories}
              </select>
            </div>
            <div class="ui submit button">Submit</div>

        </form>
  )

}

export default Form;
