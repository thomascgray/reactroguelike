import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tile.css'
import settings from '../settings.json'

const floorImage = require('../Assets/td_world/td_world_floor_tile_b.png')
const wallImage = require('../Assets/td_world/td_world_wall_stone_v_a.png')

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

        if (!this.props.backgroundColor) {
            switch (this.props.value) {
                case 0:
                    return <img src={`${floorImage}`} style={style}/>
                case 1:
                    return <img src={`${wallImage}`} style={style}/>
            }
        }

        if (this.props.image) {
            return <img src={`${this.props.image}`} style={style}/>
        }


        return (
            <div className="tile" style={style} />
        );
    }
}

TileRenderer.proptypes = {
    value: PropTypes.any,
    image: PropTypes.any,
    x: PropTypes.number,
    y: PropTypes.number,
}

export default TileRenderer;
