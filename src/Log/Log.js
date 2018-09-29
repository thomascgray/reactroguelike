import React, { Component } from 'react';
import './Log.css'

class Log extends Component {
    render() {
        return <div className='log-parent'>
            <div className='log'>
                {this.props.messages.map(message => <p key={message.id}>{message.message}</p>)}
            </div>
        </div>
    }
}

export default Log;