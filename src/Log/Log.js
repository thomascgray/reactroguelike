import React, { Component } from 'react';

class Log extends Component {
    render() {
        return <div>
            {this.props.messages.map(message => <p>{message}</p>)}
        </div>
    }
}

export default Log;