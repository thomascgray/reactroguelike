import React, { Component } from 'react';

class Log extends Component {
    render() {
        return <div>
            <h2>Log</h2>
            {this.props.messages.map(message => <p key={message.id}>{message.message}</p>)}
        </div>
    }
}

export default Log;