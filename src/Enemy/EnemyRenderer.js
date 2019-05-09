import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

class Enemy extends Component {
    componentDidMount() {
        this.props.enemy.emitter.on('stateChange', () => this.forceUpdate())
    }

    render() {
        return (
            <Tile
                x={this.props.enemy.HasPosition.getPosition().x}
                y={this.props.enemy.HasPosition.getPosition().y}
                image={this.getImage()}
            />
        );
    }

    getImage () {

        console.log('this.props.enemy', this.props.enemy);
        const images = {
            skeleton: require('../Assets/td_monsters/td_monsters_skeleton_warrior_u1.png'),
            goblin: require('../Assets/td_monsters/td_monsters_goblin_captain_r1.png'),
            dead: require(`../Assets/td_world/td_world_tombstone_broken.png`),
        }

        if (this.props.enemy.HasHp.getHp() <= 0) {
            return images.dead;
        }

        switch (this.props.enemy.HasArchetype.getArchetype()) {
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
