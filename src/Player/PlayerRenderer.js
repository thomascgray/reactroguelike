import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

const image = require('../Assets/td_monsters/td_monsters_archer_r1.png')

class Player extends Component {
    render() {
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} image={image} />
        );
    }
}

export default Player;
