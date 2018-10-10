import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'

import EnemyRenderer from '../Enemy/EnemyRenderer'
import StagePropRenderer from '../StageProp/StagePropRenderer'

class StageObjectRenderer extends Component {
    render() {
        switch (this.props.stageObject.className) {
            case 'Enemy':
                return <EnemyRenderer enemy={this.props.stageObject} />
            case 'StageProp':
                return <StagePropRenderer stageProp={this.props.stageObject} />
        }
    }
}

export default StageObjectRenderer;
