import React from 'react';
import {login} from '../actions/SessionActions';

class Login extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.context.executeAction(login, {email: this.refs.email, password: this.refs.password});
    },
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form action="/login" method="POST" onSubmit={this.handleSubmit}>
                    <label for="email">Email: </label>
                    <input type="email" required ref="email" />

                    <label for="password">Password: </label>
                    <input type="password" required ref="password" />
                </form>
            </div>
        );
    }
};

export default Login;
