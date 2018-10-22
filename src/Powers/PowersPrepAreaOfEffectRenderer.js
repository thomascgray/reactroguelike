import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'
import Uuid from 'uuid/v4'

const images = {
    centre: require(`../Assets/td_interface/tiny_dungeon_interface_select_f1.png`),
    x: require(`../Assets/td_interface/tiny_dungeon_interface_select_f1.png`),
}

class PowersPrepAreaOfEffectRenderer extends Component {
    render() {
        return this.props.power.tiles.map(tile => {
            const id = Uuid();
            return <Tile className='fade-60' key={id} id={id} x={tile.x} y={tile.y} image={tile.image || this.getTileImage()} />
        })
    }
    
    getTileImage () {
        return images.x;
    }
}

export default PowersPrepAreaOfEffectRenderer;
