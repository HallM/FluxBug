'use strict';
import React from 'react';
import connectToStores from 'fluxible/addons/connectToStores';
import SessionStore from '../stores/SessionStore';
import { navigateAction, NavLink } from 'fluxible-router';
import {logout} from '../actions/SessionActions';

var SessionNav = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func
    },

    logout(e) {
        e.preventDefault();
        this.context.executeAction(logout, {});
    },

    render() {
        const selected = this.props.selected;
        const user = this.props.user;
        
        const loginClassName = selected === 'login' ? 'pure-menu-selected' : '';
        const registerClassName = selected === 'register' ? 'pure-menu-selected' : '';
        const logoutClassName = selected === 'logout' ? 'pure-menu-selected' : '';
        
        return (
            user ?
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                <li>
                    Welcome {this.props.user.displayName}!
                </li>
                <li className={logoutClassName} key='logout'>
                    <a href="/logout" onClick={this.logout}>Logout</a>
                </li>
            </ul>
            :
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                <li className={loginClassName} key='login'>
                    <NavLink routeName='login' activeStyle={{backgroundColor: '#eee'}}>Login</NavLink>
                </li>
                <li className={registerClassName} key='register'>
                    <NavLink routeName='register' activeStyle={{backgroundColor: '#eee'}}>Register</NavLink>
                </li>
            </ul>
        );
    }
});

SessionNav.defaultProps = {
    selected: 'home'
};

export default connectToStores(SessionNav, [SessionStore], function (stores, props) {
    return {
        user: stores.SessionStore.getLoggedinUser()
    };
});
