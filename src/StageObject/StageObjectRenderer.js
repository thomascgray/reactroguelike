import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'

import EnemyRenderer from '../Enemy/EnemyRenderer'

class StageObjectRenderer extends Component {
    render() {
        switch (this.props.stageObject.className) {
            case 'Enemy':
                return <EnemyRenderer enemy={this.props.stageObject} />
        }
    }
}

export default StageObjectRenderer;
