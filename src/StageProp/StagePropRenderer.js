import React, { Component } from 'react';

import Tile from '../Tile/TileRenderer'

class StageProp extends Component {
    render() {
        return (
            <Tile x={this.props.stageProp.HasPosition.position.x} y={this.props.stageProp.HasPosition.position.y} image={this.getImage()} />
        );
    }

    getImage () {
        //todo maybe all images should be loaded from some mega class?
        const images = {
            woodChair: require('../Assets/td_world/td_world_chair.png'),
        }

        switch (this.props.stageProp.HasArchetype.archetype) {
            case 'woodChair':
                return images.woodChair;
        }
    }
}

export default StageProp;
