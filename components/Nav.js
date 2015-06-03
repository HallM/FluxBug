'use strict';
import React from 'react';
import connectToStores from 'fluxible/addons/connectToStores';
import SessionStore from '../stores/SessionStore';
import { NavLink } from 'fluxible-router';

class Nav extends React.Component {
    render() {
        const selected = this.props.selected;
        const links = this.props.links;
        const user = this.props.user;

        const linkHTML = Object.keys(links).map(function (name) {
            var className = '';
            var link = links[name];
            
            if ((user && !link.showAuthed) || (!user && !link.showUnauthed)) {
                return '';
            }

            if (selected === name) {
                className = 'pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
}

Nav.defaultProps = {
    selected: 'home'
};

export default connectToStores(Nav, [SessionStore], function (stores, props) {
    return {
        user: stores.SessionStore.getLoggedinUser()
    };
});
