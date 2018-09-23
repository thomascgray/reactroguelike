import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tile.css'
import settings from '../settings.json'

class Tile extends Component {
    render() {
        const style = {
            height: settings.tileHeight,
            width: settings.tileWidth,
            top: this.props.y * settings.tileHeight,
            left: this.props.x * settings.tileWidth,
            backgroundColor: this.props.backgroundColor,
        }
        return (
            <div className="tile" style={style} />
        );
    }
}

Tile.proptypes = {
    value: PropTypes.any,
    x: PropTypes.any,
    y: PropTypes.any,
}

export default Tile;
