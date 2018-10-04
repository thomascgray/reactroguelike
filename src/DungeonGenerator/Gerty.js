// generates the 4 by 4 style grid, also know as isaac clone, to be put all on one screen
const RandomWeighted = require('random-weighted-choice');

const generate = (dungeonTemplate) => {
    const mapWidth = (dungeonTemplate.sectionWidth * 2) + 3
    const mapHeight = (dungeonTemplate.sectionHeight * 2) + 3

    dungeonTemplate.mapWidth = mapWidth;
    dungeonTemplate.mapHeight = mapHeight;
    
    const map = generateMap(mapWidth, mapHeight);
    
    console.log('map', map);

    fillInnerWalls(dungeonTemplate, map);
    fillBoundaryWalls(dungeonTemplate, map);
    patchWalls(dungeonTemplate, map);
    carveDoors(dungeonTemplate, map)

    return {
        map,
        theme: dungeonTemplate.theme
    }
}

const fillBoundaryWalls = (dungeonTemplate, map) => {
    for (let x = 0; x < dungeonTemplate.mapWidth; x ++) { // top row
        map[x][0] = 2;
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

const fillInnerWalls = (dungeonTemplate, map) => {
    for (let x = 0; x < dungeonTemplate.mapWidth; x ++) {
        map[x][Math.floor(dungeonTemplate.mapHeight / 2)] = 2; // horizontal wall
    }
    for (let y = 0; y < dungeonTemplate.mapHeight; y ++) { // starts from 1 so that the very top remains a 1
        map[Math.floor(dungeonTemplate.mapWidth / 2)][y] = 1; // vertical wall
    }
}

const patchWalls = (dungeonTemplate, map) => {
    map[Math.floor(dungeonTemplate.mapWidth / 2)][0] = 1;
}

const carveDoors = (dungeonTemplate, map) => {
    // top door
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4) - 2] = 2; // the one above the gap should become a top wall
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4) - 1] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4)] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.ceil(dungeonTemplate.mapHeight / 4)] = 0;

    // bottom door
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4 * 3)] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4 * 3) - 2] = 2;
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.floor(dungeonTemplate.mapHeight / 4 * 3) - 1] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 2)][Math.ceil(dungeonTemplate.mapHeight / 4 * 3)] = 0;

    // left door
    map[Math.floor(dungeonTemplate.mapWidth / 4)][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 4) - 1][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;
    map[Math.ceil(dungeonTemplate.mapWidth / 4)][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;

    // right
    map[Math.floor(dungeonTemplate.mapWidth / 4 * 3)][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;
    map[Math.floor(dungeonTemplate.mapWidth / 4 * 3) - 1][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;
    map[Math.ceil(dungeonTemplate.mapWidth / 4 * 3)][Math.floor(dungeonTemplate.mapHeight / 2)] = 0;
}

const generateMap = (width, height) => {
    let map = [];

    for(let y = 0; y < width; y++) {
        let row = [];
        for(let x = 0; x < height; x++) {
            row[x] = 0;
        }
        map.push(row);
    }

    return map;
}

export {
    generate
}