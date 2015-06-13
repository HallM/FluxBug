import React from 'react';
import {register} from '../actions/UserActions';

var Register = React.createClass({
  contextTypes: {
    executeAction: React.PropTypes.func
  },

  handleSubmit(e) {
    e.preventDefault();
    this.context.executeAction(register, {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value,
      confirmPassword: React.findDOMNode(this.refs.confirmPassword).value,
      displayName: React.findDOMNode(this.refs.displayName).value
    });
  },

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form className="pure-form pure-form-stacked" action="/register" method="POST" onSubmit={this.handleSubmit}>
          <label htmlFor="displayName">Your name: </label>
          <input type="text" name="displayName" required ref="displayName" />

          <label htmlFor="email">Email: </label>
          <input type="email" name="email" required ref="email" />

          <label htmlFor="password">Password: </label>
          <input type="password" name="password" required ref="password" />

          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input type="password" name="confirmPassword" required ref="confirmPassword" />

          <button type="submit" className="pure-button pure-button-primary">Register</button>
        </form>
      </div>
    );
  }
});

export default Register;
