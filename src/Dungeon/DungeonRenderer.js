import React, { Component } from 'react';
import Tile from '../Tile/Tile'
import _ from 'lodash';
import './Dungeon.css'

class DungeonRenderer extends Component {
    shouldComponentUpdate (data) {
        return !_.isEqual(data.dungeon.map, this.props.dungeon.map)
    }

    render () {
        return <div className='dungeon'>
            {this.props.dungeon.map.map((row, rowIndex) => {
                return row.map((value, columnIndex) => {
                    let backgroundColor = '#ecf0f1';
                    if (value === 1) {
                        backgroundColor = '#2c3e50';
                    }
                    return <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        value={value}
                        x={rowIndex}
                        y={columnIndex}
                        backgroundColor={backgroundColor}
                    />
                });
            })}
        </div>
    }
}

export default DungeonRenderer;
