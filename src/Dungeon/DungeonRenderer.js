import React, { Component } from 'react';
import Tile from '../Tile/TileRenderer'
import _ from 'lodash';
import './Dungeon.css'
import RandomWeightedChoice from 'random-weighted-choice';

class DungeonRenderer extends Component {
    shouldComponentUpdate (data) {
        return !_.isEqual(data.dungeon.map, this.props.dungeon.map)
    }

    getTileImageForValue (theme, value) {
        let image;
        if (value === 0) { // floor
            image = theme.default.floors[RandomWeightedChoice(theme.default.lookupTables.floors)]
        }
        if (value === 2) {
            image = theme.default.walls.horizontal[RandomWeightedChoice(theme.default.lookupTables.walls)]
        }
        if (value === 1) {
            image = theme.default.walls.vertical[RandomWeightedChoice(theme.default.lookupTables.walls)]
        }

        return image;
    }

    render () {
        let theme = require(`../DungeonThemes/${this.props.dungeon.theme}`);
        // console.log('this.props.dungeon.theme', this.props.dungeon.theme);

        console.log('theme.default.floors', theme.default.floors);
        return <div className='dungeon'>
            {this.props.dungeon.map.map((row, rowIndex) => {
                return row.map((value, columnIndex) => {
                    return <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        x={rowIndex}
                        y={columnIndex}
                        image={this.getTileImageForValue(theme, value)}
                    />
                });
            })}
        </div>
    }
}

export default DungeonRenderer;
