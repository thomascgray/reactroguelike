import React, { Component } from 'react';
import './Player.css'
import Tile from '../Tile/TileRenderer'

class Player extends Component {
    render() {
        return (
            <Tile id='player' x={this.props.player.HasPosition.position.x} y={this.props.player.HasPosition.position.y} image={this.getPlayerImage()} />
        );
    }

    getPlayerImage () {
        const direction = this.props.player.HasDirection.direction;
        const images = {
            up: require('../Assets/td_monsters/td_monsters_druid_u1.png'),
            down: require('../Assets/td_monsters/td_monsters_druid_d1.png'),
            left: require('../Assets/td_monsters/td_monsters_druid_l1.png'),
            right: require('../Assets/td_monsters/td_monsters_druid_r1.png'),
        }

        switch (direction) {
            case 'up':
                return images.up;
            case 'down':
                return images.down;
            case 'left':
                return images.left;
            case 'right':
                return images.right;
            default:
                return images.down;
        }
    }
}

export default Player;
