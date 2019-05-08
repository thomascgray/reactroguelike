import React, { Component } from 'react';

import EnemyRenderer from '../Enemy/EnemyRenderer'
import StagePropRenderer from '../StageProp/StagePropRenderer'

class StageObjectRenderer extends Component {
    render() {
        switch (this.props.stageObject.constructor.name) {
            case 'Enemy':
                return <EnemyRenderer key={this.props.stageObject.HasId.id} enemy={this.props.stageObject} />
            case 'StageProp':
                return <StagePropRenderer key={this.props.stageObject.HasId.id} stageProp={this.props.stageObject} />
        }
    }
}

export default StageObjectRenderer;
