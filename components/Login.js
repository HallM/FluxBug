import React from 'react';
import {login} from '../actions/SessionActions';

var Login = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func
  },

  handleSubmit(e) {
    e.preventDefault();
    this.context.executeAction(login, {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    });
  },

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form className="pure-form pure-form-stacked" action="/login" method="POST" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" required ref="email" />

          <label htmlFor="password">Password: </label>
          <input type="password" name="password" required ref="password" />

          <button type="submit" className="pure-button pure-button-primary">Log in</button>
        </form>
      </div>
    );
  }
});

export default Login;
