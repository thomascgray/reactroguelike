import React, { Component } from 'react';

import Tile from '../Tile/Tile'

class Enemy extends Component {
    render() {
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} backgroundColor={'#34495e'} />
        );
    }
}

export default Enemy;
