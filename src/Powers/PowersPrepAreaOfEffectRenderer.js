import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'

const images = {
    centre: require(`../Assets/td_ui/blue.png`),
    x: require(`../Assets/td_ui/red.png`),
}


const addTilesToSourceForSquareRange = (source, range) => {
    const newTiles = []
    if (range === 1) {
        newTiles.push({
            x: source.x - 1,
            y: source.y
        })
    }
}




class Player extends Component {
    render() {
        return this.getTiles().map(tile => {
            return <Tile id='' x={tile.x} y={tile.y} image={tile.image || this.getTileImage()} />
        })
    }
    
    getTileImage () {
        return images.x;
    }

    getTiles () {
        const tiles = [
            {
                x: this.props.power.realSource.x,
                y: this.props.power.realSource.y,
                image: images.centre
            }
        ]

        if (this.props.power.shape === 'circle') {


            return tiles;
        }

        if (this.props.shape === 'square') {

        }
    }
}

export default Player;
