import React from 'react';
import {register} from '../actions/UserActions';

class Register extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.context.executeAction(register, {
            email: this.refs.email,
            password: this.refs.password,
            confirmPassword: this.refs.confirmPassword,
            displayName: this.refs.displayName
        });
    },
    render() {
        return (
            <div>
                <h2>Register</h2>
                <form action="/register" method="POST" onSubmit={this.handleSubmit}>
                    <label for="displayName">Your name: </label>
                    <input type="text" required ref="displayName" />

                    <label for="email">Email: </label>
                    <input type="email" required ref="email" />

                    <label for="password">Password: </label>
                    <input type="password" required ref="password" />

                    <label for="confirmPassword">Confirm Password: </label>
                    <input type="password" required ref="confirmPassword" />
                </form>
            </div>
        );
    }
};

export default Register;
