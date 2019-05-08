import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tile from '../Tile/TileRenderer'

class StageProp extends Component {
    render() {
        return (
            <Tile x={this.props.stageProp.HasPosition.getPosition().x} y={this.props.stageProp.HasPosition.getPosition().y} image={this.getImage()} />
        );
    }

    getImage () {
        //todo maybe all images should be loaded from some mega class?
        const images = {
            woodChair: require('../Assets/td_world/td_world_chair.png'),
            woodThrone: require('../Assets/td_world/td_world_throne_wood.png'),
            warriorStatue: require('../Assets/td_world/td_world_statue_warrior.png'),
            graveBroken: require('../Assets/td_world/td_world_tombstone_broken.png')
        }

        return images[this.props.stageProp.HasArchetype.getArchetype()];
    }
}

StageProp.propTypes = {
    stageProp: PropTypes.object
};

export default StageProp;
