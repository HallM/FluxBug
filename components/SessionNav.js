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

    const loginClassName = 'pure-menu-item' + selected === 'login' ? 'pure-menu-selected' : '';
    const registerClassName = 'pure-menu-item' + selected === 'register' ? 'pure-menu-selected' : '';
    const logoutClassName = 'pure-menu-item' + selected === 'logout' ? 'pure-menu-selected' : '';

    const menuStyle = {
      margin: 0,
      padding: 0
    };

    const menuItemStyle = {
      float: 'right'
    };

    return (
      user ?
      <div className="pure-u-1-3">
        <ul className="pure-menu pure-menu-horizontal">
          <li className={logoutClassName} key='logout' style={menuItemStyle}>
            <a href="/logout" onClick={this.logout}>Logout</a>
          </li>
          <li style={menuItemStyle}>
            Welcome {this.props.user.displayName}!
          </li>
        </ul>
      </div>
      :
      <div className="pure-u-1-3">
        <ul className="pure-menu pure-menu-horizontal" style={menuStyle}>
          <li className={loginClassName} key='login' style={menuItemStyle}>
            <NavLink routeName='login' activeStyle={{backgroundColor: '#eee'}}>Login</NavLink>
          </li>
          <li className={registerClassName} key='register' style={menuItemStyle}>
            <NavLink routeName='register' activeStyle={{backgroundColor: '#eee'}}>Register</NavLink>
          </li>
        </ul>
      </div>
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
