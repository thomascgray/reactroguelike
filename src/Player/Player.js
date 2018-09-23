import React, { Component } from 'react';

import Tile from '../Tile/Tile'

class Player extends Component {
    render() {
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} backgroundColor={'#e74c3c'} />
        );
    }
}

export default Player;
