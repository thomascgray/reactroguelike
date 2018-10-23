import React, { Component } from 'react';
import './Log.css'

class Log extends Component {
    render() {
        return <div className='log-parent'>
            <div className='log'>
                {this.props.messages.map(message => <span key={message.id}>{message.message}</span>)}
            </div>
        </div>
    }
}

export default Log;