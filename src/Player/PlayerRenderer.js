import React, { Component } from 'react';
import './Player.css'
import Tile from '../Tile/TileRenderer'

class Player extends Component {
    componentDidMount() {
        this.props.player.emitter.on('stateChange', () => this.forceUpdate())
    }

    render() {
        return (
            <Tile
                id='player'
                x={this.props.player.HasPosition.getPosition().x}
                y={this.props.player.HasPosition.getPosition().y}
                image={this.getPlayerImage()}
            />
        );
    }

    getPlayerImage () {
        const direction = this.props.player.HasDirection.direction;
        const images = {
            up: require(`../Assets/td_monsters/td_monsters_${this.props.player.HasArchetype.getArchetype()}_u1.png`),
            down: require(`../Assets/td_monsters/td_monsters_${this.props.player.HasArchetype.getArchetype()}_d1.png`),
            left: require(`../Assets/td_monsters/td_monsters_${this.props.player.HasArchetype.getArchetype()}_l1.png`),
            right: require(`../Assets/td_monsters/td_monsters_${this.props.player.HasArchetype.getArchetype()}_r1.png`),
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
