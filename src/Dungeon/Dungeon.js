import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile'
import {generate} from '../DungeonGenerator/DungeonGenerator'

class Dungeon extends Component {
    constructor (props) {
        super(props);
        this.state = {
            map: generate(this.props.width, this.props.height)
        }
    }
    
    render () {
        return <div>
            {this.state.map.map((row, rowIndex) => {
                return row.map((value, columnIndex) => {
                    return <Tile key={`${rowIndex}-${columnIndex}`} value={value} x={rowIndex} y={columnIndex} />
                });
            })}
        </div>
    }
}

Dungeon.proptypes = {
    width: PropTypes.number,
    height: PropTypes.number,
}

export default Dungeon;
