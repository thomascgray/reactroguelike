import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'

const images = {
    centre: require(`../Assets/td_interface/tiny_dungeon_interface_select_f1.png`),
    x: require(`../Assets/td_interface/tiny_dungeon_interface_select_f1.png`),
}

class PowersPrepAreaOfEffectRenderer extends Component {
    render() {
        return null
    }
    
    getTileImage () {
        return images.x;
    }
}

export default PowersPrepAreaOfEffectRenderer;
