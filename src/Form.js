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

  // componentDidMount() {
  //   props.activity ? this.setState({})
  // }

  handleNameInput = (ev) => {
    this.setState({
      nameInput: ev.target.value
    })
  }

  handleDescInput = (ev) => {
    this.setState({
      descInput: ev.target.value
    })
  }

  handleCatChange = (ev) => {
    this.setState({
      currentCat: ev.target.value
    })
  }


  render() {
    const categories = this.props.categories.map(cat => {
      return <option key={cat.id} value={cat.id}>{cat.name}</option>
    })

    console.log('FORM STATE', this.state)

    return (
        <form className="ui form" >
            <h4 className="ui dividing header">New Activity</h4>
              <div className="field">
                <label>Name</label>
                    <div className="field">
                      <input
                      onChange={this.handleNameInput}
                      value={this.state.nameValue}
                      type="text"
                      name="shipping[first-name]" />
                    </div>
              </div>
              <div className="field">
                <label>Description</label>
                    <div className="field">
                      <textarea
                      onChange={this.handleDescInput}
                      value={this.state.descValue}>
                      </textarea>
                    </div>
              </div>
              <div className="field">
                <label>Category</label>
                <select
                onChange={this.handleCatChange}
                value={this.state.currentCat}
                className="ui fluid dropdown">
                  <option value="">Select Category</option>
                  {categories}
                </select>
              </div>
              <div className="ui submit button" onClick={() => this.props.newActivity(this.state)}>Submit</div>
          </form>
    )
  }
}

export default Form;
