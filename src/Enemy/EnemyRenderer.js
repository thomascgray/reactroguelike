import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

class Enemy extends Component {
    render() {
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} backgroundColor={'#e74c3c'} />
        );
    }
}

export default Enemy;
