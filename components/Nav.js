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

        const linkHTML = Object.keys(links).map((name) => {
            let className = 'pure-menu-item';
            let link = links[name];
            
            if ((user && !link.showAuthed) || (!user && !link.showUnauthed)) {
                return '';
            }

            if (selected === name) {
                className = className + ' pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page} activeStyle={{backgroundColor: '#eee'}}>{link.title}</NavLink>
                </li>
            );
        });

        const menuStyle = {
            margin: 0,
            padding: 0
        };

        return (
            <div className="pure-u-2-3">
                <ul className="pure-menu pure-menu-horizontal" style={menuStyle}>
                    {linkHTML}
                </ul>
            </div>
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
