import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

class Player extends Component {
    render() {
        const image = require('../Assets/td_monsters/td_monsters_angel_d1.png')
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} image={image} />
        );
    }
}

export default Player;
