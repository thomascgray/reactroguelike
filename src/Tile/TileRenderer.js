import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tile.css'
import settings from '../settings.json'

class TileRenderer extends Component {
    render() {
        const _x = this.props.x || 0
        const _y = this.props.y || 0
        const style = {
            position: 'absolute',
            height: settings.tileHeight,
            width: settings.tileWidth,
            backgroundColor: this.props.backgroundColor,
            top: `${_y * settings.tileHeight}px`,
            left: `${_x * settings.tileWidth}px`,
        }

        if (this.props.image) {
            return <img src={`${this.props.image}`} style={style} />
        }

        return <div className="tile" style={style} />;
    }
}

TileRenderer.proptypes = {
    image: PropTypes.any,
    theme: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
}

export default TileRenderer;
