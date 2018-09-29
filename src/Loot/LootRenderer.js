import React, { Component } from 'react';

import Tile from '../Tile/Tile'

class Loot extends Component {
    render() {
        return (
            <Tile x={this.props.position.x} y={this.props.position.y} backgroundColor={'#27ae60'} />
        );
    }
}

export default Loot;
