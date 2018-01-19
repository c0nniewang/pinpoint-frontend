import React from 'react';

const Form = (props) => {
  const categories = props.categories.map(cat => {
    return <option key={cat.id} value={cat.id}>{cat.name}</option>
  })

  return (
      <form className="ui form">
          <h4 className="ui dividing header">New Activity</h4>
            <div className="field">
              <label>Name</label>
                  <div className="field">
                    <input type="text" name="shipping[first-name]" />
                  </div>
            </div>
            <div className="field">
              <label>Description</label>
                  <div className="field">
                    <textarea></textarea>
                  </div>
            </div>
            <div className="field">
              <label>Category</label>
              <select className="ui fluid dropdown">
                <option value="">Select Category</option>
                {categories}
              </select>
            </div>
            <div className="ui submit button">Submit</div>

        </form>
  )

}

export default Form;
