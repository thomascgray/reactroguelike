import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/TileRenderer'
import './Dungeon.css'
import RandomWeightedChoice from 'random-weighted-choice';

const miscTiles = {
    carpet: require('../Assets/td_world/td_world_floor_carpet_a.png')
}

class DungeonRenderer extends Component {
    getTileImageForValue(theme, value) {
        let image;
        if (value === 0) { // floor
            image = theme.default.floors[RandomWeightedChoice(theme.default.lookupTables.floors)]
        }
        if (value === 1) {
            image = theme.default.walls.vertical[RandomWeightedChoice(theme.default.lookupTables.walls)]
        }
        if (value === 2) {
            image = theme.default.walls.horizontal[RandomWeightedChoice(theme.default.lookupTables.walls)]
        }
        if (value === 3) {
            image = miscTiles.carpet
        }

        return image;
    }

    render() {
        let themeName = this.props.theme;
        if (!themeName) {
            themeName = 'crypt';
        }
        let theme = require(`../DungeonThemes/${themeName}`);

        return <div className='dungeon'>
            {this.props.map.map((row, rowIndex) => {
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

DungeonRenderer.propTypes = {
    map: PropTypes.array,
    theme: PropTypes.string,
};

export default DungeonRenderer;
