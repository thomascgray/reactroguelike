import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'
import PowersPrepAreaOfEffectRenderer from './PowersPrepAreaOfEffectRenderer'
class Player extends Component {
    render() {
        switch (this.props.power.type) {
            case 'areaOfEffect':
            return <PowersPrepAreaOfEffectRenderer power={this.props.power} />
        }
    }
}

export default Player;
