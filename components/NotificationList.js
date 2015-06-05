'use strict';
import React from 'react';
import connectToStores from 'fluxible/addons/connectToStores';
import NotificationStore from '../stores/NotificationStore';
import Notification from './Notification'

class NotificationList extends React.Component {
    render() {
        const messages = this.props.messages;

        const messageHTML = messages.map((message) => {
            return (
                <Notification msgType={message.type} msgContent={message.message} />
            );
        });

        return (
            <div>
                {messageHTML}
            </div>
        );
    }
}

export default connectToStores(NotificationList, [NotificationStore], function (stores, props) {
    return {
        messages: stores.NotificationStore.getCurrentMessages()
    };
});
