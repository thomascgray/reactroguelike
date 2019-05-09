import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tile.css'
import settings from '../settings.json'
import Uuid from 'uuid/v4'

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

        const className = this.props.className ? `tile ${this.props.className}` : 'tile'
        const id = this.props.id ? this.props.id : Uuid()

        if (this.props.image) {
            return <img id={id} data-x={_x} data-y={_y} className={className} src={`${this.props.image}`} style={style} />
        }

        return <div id={id} data-x={_x} data-y={_y} className={className} style={style} />;
    }
}

TileRenderer.propTypes = {
    image: PropTypes.any,
    theme: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
}

export default TileRenderer;
