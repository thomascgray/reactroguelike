import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

class Enemy extends Component {
    render() {
        return (
            <Tile x={this.props.enemy.HasPosition.position.x} y={this.props.enemy.HasPosition.position.y} image={this.getImage()} />
        );
    }

    getImage () {
        const images = {
            skeleton: require('../Assets/td_monsters/td_monsters_skeleton_lich_u1.png'),
            goblin: require('../Assets/td_monsters/td_monsters_goblin_captain_r1.png'),
        }

        switch (this.props.enemy.HasArchetype.archetype) {
            case 'skeleton':
                return images.skeleton;
            case 'goblin':
                return images.goblin;
            default:
                return images.skeleton;
        }
    }
}

export default Enemy;
