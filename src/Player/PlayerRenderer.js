import React, { Component } from 'react';

import './Player.css'

import Tile from '../Tile/TileRenderer'

class Player extends Component {
    render() {
        return (
            <Tile className={'player'} x={this.props.player.HasPosition.position.x} y={this.props.player.HasPosition.position.y} image={getPlayerImage()} />
        );
    }
}

const getPlayerImage = () => {
    const direction = this.props.player.HasDirection.getDirection();
    const images = {
        up: require('../Assets/td_monsters/td_monsters_druid_u1.png'),
        down: require('../Assets/td_monsters/td_monsters_druid_d1.png'),
        left: require('../Assets/td_monsters/td_monsters_druid_l1.png'),
        right: require('../Assets/td_monsters/td_monsters_druid_r1.png'),
    }

    return images.down;
}

export default Player;
