// generates the 4 by 4 style grid, also know as isaac clone, to be put all on one screen
const Random = require("random-js")(); // uses the nativeMath engine

const generate = (dungeonTemplate) => {
    const mapWidth = (dungeonTemplate.sectionWidth * 2) + 3
    const mapHeight = (dungeonTemplate.sectionHeight * 2) + 3

    dungeonTemplate.mapWidth = mapWidth;
    dungeonTemplate.mapHeight = mapHeight;

    dungeonTemplate.crossSectionX = Math.floor(dungeonTemplate.mapWidth / 2);
    dungeonTemplate.crossSectionY = Math.floor(dungeonTemplate.mapHeight / 2);
    
    const map = generateMap(mapWidth, mapHeight);
    
    fillCrossSectionWalls(dungeonTemplate, map);
    fillBoundaryWalls(dungeonTemplate, map);
    carveDoors(dungeonTemplate, map)
    patchWalls(mapWidth, mapHeight, map);

    return {
        map,
        theme: dungeonTemplate.theme
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

const patchWalls = (mapWidth, mapHeight, map) => {
    for(let y = 0; y < mapWidth; y++) {
        for(let x = 0; x < mapHeight; x++) {
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