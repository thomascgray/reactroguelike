import React, { Component } from 'react';
import './Camera.css'
import settings from '../settings.json'

class Camera extends Component {
    render() {
        const style = {
            position: 'absolute',
            transform: `translate(${this.props.position.x}px, ${this.props.position.y}px)` 
        }
        return <div className='camera' style={style}>
            {this.props.children}
        </div>
    }
}

export default Camera;
