import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      descInput: '',
      currentCat: ''
    }
  }

  const categories = props.categories.map(cat => {
    return <option key={cat.id} value={cat.id}>{cat.name}</option>
  })


  render() {
    return (
        <form className="ui form" onSubmit={props.newActivity}>
            <h4 className="ui dividing header">New Activity</h4>
              <div className="field">
                <label>Name</label>
                    <div className="field">
                      <input
                      onChange={props.nameInput}
                      value={props.nameValue}
                      type="text"
                      name="shipping[first-name]" />
                    </div>
              </div>
              <div className="field">
                <label>Description</label>
                    <div className="field">
                      <textarea
                      onChange={props.descInput}
                      value={props.descValue}>
                      </textarea>
                    </div>
              </div>
              <div className="field">
                <label>Category</label>
                <select
                onChange={props.handleCatChange}
                value={props.CatValue}
                className="ui fluid dropdown">
                  <option value="">Select Category</option>
                  {categories}
                </select>
              </div>
              <div className="ui submit button">Submit</div>
          </form>
    )
  }
}

export default Form;
