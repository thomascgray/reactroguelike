import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile'
import {generate} from '../DungeonGenerator/DungeonGenerator'

class Dungeon extends Component {
    render () {
        return <div>
            {this.props.map.map((row, rowIndex) => {
                return row.map((value, columnIndex) => {
                    return <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        value={value}
                        x={rowIndex}
                        y={columnIndex}
                    />
                });
            })}
            <Tile
                backgroundColor={'#3498db'}
                x={this.props.exit.x}
                y={this.props.exit.y}
            />
        </div>
    }
}

Dungeon.proptypes = {
    // width: PropTypes.number,
    // height: PropTypes.number,
}

export default Dungeon;
