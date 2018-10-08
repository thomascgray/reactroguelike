import React, { Component } from 'react';

import StageObjectRenderer from './StageObjectRenderer'

class StageObjectsRenderer extends Component {
    render() {
        return <div>
            {this.props.stageObjects.map(obj => {
                return <StageObjectRenderer key={obj.HasId.id} stageObject={obj}/>
            })}
        </div>
        
    }
}

export default StageObjectsRenderer;
