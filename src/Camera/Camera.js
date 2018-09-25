import React, { Component } from 'react';
import './Camera.css'
import settings from '../settings.json'

class Camera extends Component {
    render() {
        const _x = (this.props.position.x * -1)
        const _y = (this.props.position.y * -1)

        const style = {
            position: 'absolute',
            transform: `translate(${_x * settings.tileWidth}px, ${_y * settings.tileHeight}px)` 
        }
        return <div className='camera' style={style}>
            {this.props.children}
        </div>
    }
}

export default Camera;
