import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/Tile'
import {generate} from '../DungeonGenerator/DungeonGenerator'
import _ from 'lodash';
import settings from '../settings.json'

class Dungeon extends Component {
    shouldComponentUpdate (data) {
        return !_.isEqual(data.map, this.props.map)
    }

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
        </div>
    }
}

Dungeon.proptypes = {
    // width: PropTypes.number,
    // height: PropTypes.number,
}

export default Dungeon;
