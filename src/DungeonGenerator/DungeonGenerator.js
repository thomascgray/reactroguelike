const Random = require("random-js")(); // uses the nativeMath engine

const isBetween = (value, lowerBound, upperBound) => value > lowerBound && value < upperBound
const isBetweenIncl = (value, lowerBound, upperBound) => value >= lowerBound && value <= upperBound

const generate = (dungeonTemplate) => {
    if (dungeonTemplate.type === 'rooms') {
        const map = generateMap(dungeonTemplate.width, dungeonTemplate.height);
        const rooms = generateRooms(dungeonTemplate, map);
    
        return {
            map,
            rooms 
        }
    }

    // if (dungeonTemplate.type === 'rogue') {
    //     const map = generateMap(dungeonTemplate.width, dungeonTemplate.height);
    //     const sections = []

    //     const sectionWidth = dungeonTemplate.width / dungeonTemplate.rogue.columns;
    //     const sectionHeight = dungeonTemplate.height / dungeonTemplate.rogue.rows;

    //     for (let x = 0; x < dungeonTemplate.rogue.columns; x++) {
    //         for (let y = 0; y < dungeonTemplate.rogue.rows; y++) {
    //             const corner = {
    //                 x: x * sectionWidth,
    //                 y: y * sectionHeight
    //             }

    //             console.log('corner', corner);
    //         }
            
    //     }

    //     return {
    //         map,
    //     }
    // }

    // if (dungeonTemplate.type === 'isaacdungeon') {
    //     const map = generateMap(dungeonTemplate.width, dungeonTemplate.height);
    
    //     let roomCount = dungeonTemplate.isaacdungeon.roomCount;

    //     let rooms = []

    //     while(roomCount > 0) {
    //         // generate and add a room
    //         const room = generateSmallRoom(dungeonTemplate)
    //         rooms.push(room);

    //         const constructs = generateCorridorRoomPair(dungeonTemplate, room, getRandomDirection())

    //         roomCount -=1;
    //     }

    //     rooms.forEach(room => {
    //         room.wallTiles.forEach(tile => {
    //             map[tile.x][tile.y] = 1;
    //         });
    //     })

    //     return {
    //         map,
    //         rooms 
    //     }
    // }
}

// const generateRoomForSection = () => {

// }

// const generateCorridorRoomPair = (dungeonTemplate, originalRoom, direction) => {
//     const startingTileForCorridor = Random.pick(getDirectionWallTiles(direction, originalRoom));

//     console.log('startingTileForCorridor', startingTileForCorridor);



// }

const generateCorridor = (direction, room) => {

}

const generateRooms = (dungeonTemplate, map) => {
    const allRooms = [];

    dungeonTemplate.rooms.forEach(roomTemplate => {
        for(let i = 0; i < roomTemplate.count; i++) {
            let room;
            switch (roomTemplate.size) {
                case 'sm':
                    room = generateSmallRoom(dungeonTemplate);
                    break;
            }

            // ensure the room doesn't overlap with any others

            // if room tlc x is between _room tlc x and _room trc x
            // AND room tlc y is between _room tlc y and _room trc y
            // its overlapping

            let isOverlapping = false;
            allRooms.forEach(oldRoom => {
                if (isBetweenIncl(room.corners.topLeftCorner.x, oldRoom.corners.topLeftCorner.x, oldRoom.corners.topRightCorner.x)) {
                    if (isBetweenIncl(room.corners.topLeftCorner.y, oldRoom.corners.topLeftCorner.y, oldRoom.corners.topRightCorner.y)) {
                        isOverlapping = true;
                        return;
                    }
                }
            });

            console.log('isOverlapping', isOverlapping);
            if (!isOverlapping) {
                allRooms.push(room);
            }
        }
    });


    allRooms.forEach(room => {
        room.wallTiles.forEach(tile => {
            map[tile.x][tile.y] = 1;
        });
    })
}

const generateSmallRoom = (dungeonTemplate) => {
    let width = Random.integer(4, 7);
    let height = Random.integer(4, 7);

    width--;
    height--;

    const topLeftCorner = {
        x: Random.integer(0, (dungeonTemplate.width - 1) - width), // random number between 0 and map width - room width
        y: Random.integer(0, (dungeonTemplate.height - 1) - height) // random number between 0 and map width - room width
    }
    const bottomLeftCorner = {
        x: topLeftCorner.x,
        y: topLeftCorner.y + height
    }
    const topRightCorner = {
        x: topLeftCorner.x + width,
        y: topLeftCorner.y
    }
    const bottomRightCorner = {
        x: topLeftCorner.x + width,
        y: topLeftCorner.y + height
    }

    const corners = {
        topLeftCorner,
        bottomLeftCorner,
        topRightCorner,
        bottomRightCorner,
    }

    const wallTiles = [];
    const directionWallTiles = {
        north: [],
        east: [],
        south: [],
        west: [],
    };

    let tile = {}
    for (let x = topLeftCorner.x; x <= topRightCorner.x; x++) { // top row
        tile = { x, y: topLeftCorner.y };
        wallTiles.push(tile);
        directionWallTiles.north.push(tile);
    }
    for (let x = bottomLeftCorner.x; x <= bottomRightCorner.x; x++) { // bottom row
        tile = { x, y: bottomLeftCorner.y };
        wallTiles.push(tile);
        directionWallTiles.south.push(tile);
    }
    for (let y = topLeftCorner.y; y <= bottomLeftCorner.y; y++) { // left column
        tile = { x: topLeftCorner.x, y };
        wallTiles.push(tile);
        directionWallTiles.west.push(tile);
    }
    for (let y = topRightCorner.y; y <= bottomRightCorner.y; y++) { // right column
        tile = { x: topRightCorner.x, y };
        wallTiles.push(tile);
        directionWallTiles.east.push(tile);
    }

    return {
        width,
        height,
        corners,
        wallTiles,
        directionWallTiles
    }
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

const getDirectionWallTiles = (direction, room) => room.directionWallTiles[direction]

const getRandomDirection = () => Random.pick(['north', 'east', 'south', 'west'])

export {
    generate
}