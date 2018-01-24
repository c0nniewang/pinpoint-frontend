import React from 'react';
import { login } from './Adapter.js';


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      error: false,
      fields: {
        email: '',
        password: ''
      }
    }
  }

  handleChange = e => {
    const newFields = {...this.state.fields, [e.target.name]: e.target.value};
    this.setState({fields: newFields});
  }

  handleSubmit = e => {
    console.log(this.state.fields.email)
    login(this.state.fields.email, this.state.fields.password).then(json => {
      if (json.error) {
        this.setState({ error: true });
      } else {
        this.props.handleLogin(json)
        this.props.history.push('/profile/activities')
      }
    })
  }

  render() {
    const { fields } = this.state;
    return (
      <div className="login-style">
        {this.state.error ? <h1>Try Again</h1> : null}
        <div class="ui middle aligned center aligned grid">
            <div class="column">
              <h2 class="ui teal image header">
                <h1><i class="map pin icon"/>Pinpoint</h1>
                <div class="title">
                  Log-in to your account
                </div>
              </h2>
              <form class="ui large form">
                <div class="ui stacked segment">
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="user icon"></i>
                      <input type="text" name="email"
                          placeholder="email"
                          value={fields.email}
                          onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui left icon input">
                      <i class="lock icon"></i>
                      <input type="password" name="password"
                            type="password"
                            placeholder="password"
                            value={fields.password}
                            onChange={this.handleChange} />
                    </div>
                  </div>
                  <div class="ui fluid large teal submit button" onClick={this.handleSubmit}>Login</div>
                </div>

                <div class="ui error message"></div>

              </form>
              </div>
        </div>
      </div>
    );
  }
}

export default Login;
