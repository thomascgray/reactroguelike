// generates the 4 by 4 style grid, also know as isaac clone, to be put all on one screen
import _ from 'lodash';
import Enemy from '../Enemy/Enemy'

const Random = require("random-js")(); // uses the nativeMath engine

const generate = (dungeonTemplate) => {
    const mapWidth = (dungeonTemplate.sectionWidth * 2) + 3
    const mapHeight = (dungeonTemplate.sectionHeight * 2) + 3

    dungeonTemplate.mapWidth = mapWidth;
    dungeonTemplate.mapHeight = mapHeight;

    dungeonTemplate.crossSectionX = Math.floor(dungeonTemplate.mapWidth / 2);
    dungeonTemplate.crossSectionY = Math.floor(dungeonTemplate.mapHeight / 2);
    
    const map = generateMap(dungeonTemplate);
    
    fillCrossSectionWalls(dungeonTemplate, map);
    fillBoundaryWalls(dungeonTemplate, map);
    carveDoors(dungeonTemplate, map)
    patchWalls(dungeonTemplate, map);

    const { rooms, stageObjects } = generateRooms(dungeonTemplate, map);

    return {
        map,
        theme: dungeonTemplate.theme,
        rooms,
        stageObjects
    }
}

const fillBoundaryWalls = (dungeonTemplate, map) => {
    for (let x = 0; x < dungeonTemplate.mapWidth; x ++) { // top row
        map[x][0] = 1;
    }
    for (let x = 0; x < dungeonTemplate.mapWidth; x ++) { // bottom row
        map[x][dungeonTemplate.mapWidth - 1] = 1;
    }
    for (let y = 0; y < dungeonTemplate.mapHeight; y ++) { // left column
        map[0][y] = 1;
    }
    for (let y = 0; y < dungeonTemplate.mapHeight; y ++) { // right column
        map[dungeonTemplate.mapHeight - 1][y] = 1;
    }
}

const fillCrossSectionWalls = (dungeonTemplate, map) => {
    for (let x = 0; x < dungeonTemplate.mapWidth; x ++) {
        map[x][dungeonTemplate.crossSectionY] = 1; // horizontal wall
    }
    for (let y = 0; y < dungeonTemplate.mapHeight; y ++) { // starts from 1 so that the very top remains a 1
        map[dungeonTemplate.crossSectionX][y] = 1; // vertical wall
    }
}

const patchWalls = (dungeonTemplate, map) => {
    for(let y = 0; y < dungeonTemplate.mapWidth; y++) {
        for(let x = 0; x < dungeonTemplate.mapHeight; x++) {
            if (map[x][y] === 1 && map[x][y + 1] === 0) {
                map[x][y] = 2;
            }
        }
    }

}

const carveDoors = (dungeonTemplate, map) => {
    switch (dungeonTemplate.doorPlacement) {
        case 'center':
            return carveDoorsRandom(dungeonTemplate, map);
        case 'random':
            return carveDoorsRandom(dungeonTemplate, map);
    }
}

const carveDoorsRandom = (dungeonTemplate, map) => {
    
    //top door
    if (dungeonTemplate.doors.north) {
        const startTile = Random.integer(2, dungeonTemplate.sectionHeight - 1);
        const alt = Random.bool();
        map[dungeonTemplate.crossSectionX][startTile] = 0
        if (alt) {
            map[dungeonTemplate.crossSectionX][startTile - 1] = 0
        } else {
            map[dungeonTemplate.crossSectionX][startTile + 1] = 0
        }
    }

    // left door
    if (dungeonTemplate.doors.west) {
        const startTile = Random.integer(2, dungeonTemplate.sectionWidth - 1);
        const alt = Random.bool();
        map[startTile][dungeonTemplate.crossSectionY] = 0
        if (alt) {
            map[startTile - 1][dungeonTemplate.crossSectionY] = 0
        } else {
            map[startTile + 1][dungeonTemplate.crossSectionY] = 0
        }
    }

    // right door
    //todo finish this
    // if (dungeonTemplate.doors.west) {
    //     const startTile = Random.integer(2, dungeonTemplate.sectionWidth - 1);
    //     const alt = Random.bool();
    //     map[startTile][dungeonTemplate.crossSectionY] = 0
    //     if (alt) {
    //         map[startTile - 1][dungeonTemplate.crossSectionY] = 0
    //     } else {
    //         map[startTile + 1][dungeonTemplate.crossSectionY] = 0
    //     }
    // }
}

// for each room, choose a template, and then run its generation things
// apply offset to positions based on the rooms offset
const generateRooms = (dungeonTemplate, map) => {

    // get a room template for the left room
    const template = _.cloneDeep(require('../SectionTemplates/a.json'))
    const enemies = template.enemies.map(enemy => {
        enemy.position.y += Number(dungeonTemplate.crossSectionY);
        return new Enemy({
            position: enemy.position,
            hp: 5, 
            archetype: enemy.archetype
        });
    });

    const xoffset = 1;
    const yoffset = 9;

    // change the real map to be affected by the template map
    for(let y = 0; y < dungeonTemplate.crossSectionX - 1; y++) {
        for(let x = 0; x < dungeonTemplate.crossSectionY - 1; x++) {
            console.log(x, y);
            map[x + 1][y + yoffset] = template.map[y][x]
        }
    }

    return {
        rooms: [],
        stageObjects: enemies,
    }
}

const generateMap = (dungeonTemplate) => {
    let map = [];

    for(let y = 0; y < dungeonTemplate.mapWidth; y++) {
        let row = [];
        for(let x = 0; x < dungeonTemplate.mapHeight; x++) {
            row[x] = 0;
        }
        map.push(row);
    }

    return map;
}

export {
    generate
}