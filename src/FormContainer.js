import React from 'react';

const FormContainer = (props) => {
  return (
    <div className="column">
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
              <label>State</label>
              <select class="ui fluid dropdown">
                <option value="">Select Category</option>
              </select>
            </div>
            <div class="ui submit button">Submit</div>

        </form>
    </div>
  )

}

export default FormContainer;
