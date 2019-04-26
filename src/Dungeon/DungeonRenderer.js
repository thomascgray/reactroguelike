import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from '../Tile/TileRenderer'
import './Dungeon.css'
import RandomWeightedChoice from 'random-weighted-choice';

const miscTiles = {
    carpet: require('../Assets/td_world/td_world_floor_carpet_a.png')
}

function getTileImageForValue(theme, value) {
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

class DungeonRenderer extends Component {
    render() {
        let themeName = this.props.dungeon.theme;
        if (!themeName) {
            themeName = 'crypt';
        }
        let theme = require(`../DungeonThemes/${themeName}`);

        return <div className='dungeon'>
            {this.props.dungeon.floors[this.props.activeFloorIndex].map.map((row, rowIndex) => {
                return row.map((value, columnIndex) => {
                    return <Tile
                        key={`${rowIndex}-${columnIndex}`}
                        x={rowIndex}
                        y={columnIndex}
                        image={getTileImageForValue(theme, value)}
                    />
                });
            })}
        </div>
    }
}

DungeonRenderer.propTypes = {
    activeFloorIndex: PropTypes.number,
    dungeon: PropTypes.object,
};

export default DungeonRenderer;
