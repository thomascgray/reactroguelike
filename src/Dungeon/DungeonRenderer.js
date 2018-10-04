import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'
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
                    return <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        value={value}
                        x={rowIndex}
                        y={columnIndex}
                    />
                });
            })}
        </div>
    }
}

export default DungeonRenderer;
