/*globals document*/

import React from 'react';

import Nav from './Nav';
import SessionNav from './SessionNav';
import Home from './Home';
import About from './About';
import NotificationList from './NotificationList';

import ApplicationStore from '../stores/ApplicationStore';

import provideContext from 'fluxible/addons/provideContext';
import connectToStores from 'fluxible/addons/connectToStores';
import { handleHistory } from 'fluxible-router';

// @TODO Upgrade to ES6 class when RouterMixin is replaced
var Application = React.createClass({
    render: function () {
        var Handler = this.props.currentRoute.get('handler');
        
        const menuStyle = {
            paddingLeft: '20px',
            paddingRight: '20px'
            //backgroundColor: '#1188bb'
        }

        const pageStyle = {
            marginTop: '20px',
            marginBottom: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '10px',
            paddingRight: '10px',
            maxWidth: '1100px'
        };

        return (
            <div>
                <div className="navHeader pure-g" style={menuStyle}>
                    <Nav selected={this.props.currentPageName} links={this.props.pages} />
                    <SessionNav selected={this.props.currentPageName} />
                </div>
                <div style={pageStyle}>
                    <NotificationList />

                    <Handler />
                </div>
            </div>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
});

export default handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages()
        };
    }
)));
