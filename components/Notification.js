'use strict';
import React from 'react';

class Notification extends React.Component {
    render() {
        const className = 'pure-alert pure-alert-' + this.props.msgType;
        return (
            <div className={className}>
                {this.props.msgContent}
            </div>
        );
    }
}

export default Notification;
