const Random = require("random-js")(); // uses the nativeMath engine

const generate = (dungeonTemplate) => {
    const map = generateBase(dungeonTemplate.width, dungeonTemplate.height);
    const rooms = generateRooms(dungeonTemplate, map);

    return {
        map,
        rooms 
    }
}

const generateRooms = (dungeonTemplate, map) => {
    // const allRooms = [];

    dungeonTemplate.rooms.forEach(roomTemplate => {
        for(let i = 0; i < roomTemplate.count; i++) {
            let room;
            switch (roomTemplate.size) {
                case 'sm':
                    room = generateSmallRoom(dungeonTemplate);
                    break;
            }

            room.wallTiles.forEach(tile => {
                map[tile.x][tile.y] = 1;
            })

        }
    });
}

const generateSmallRoom = (dungeonTemplate) => {
    const width = Random.integer(4, 7);
    const height = Random.integer(4, 7);

    const topLeftCorner = {
        x: Random.integer(0, dungeonTemplate.width - width), // random number between 0 and map width - room width
        y: Random.integer(0, dungeonTemplate.height - height) // random number between 0 and map width - room width
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
    for (let x = topLeftCorner.x; x <= topRightCorner.x; x++) { // top row
        wallTiles.push({ x, y: topLeftCorner.y });
    }
    for (let x = bottomLeftCorner.x; x <= bottomRightCorner.x; x++) { // bottom row
        wallTiles.push({ x, y: bottomLeftCorner.y });
    }
    for (let y = topLeftCorner.y; y <= bottomLeftCorner.y; y++) { // left column
        wallTiles.push({ x: topLeftCorner.x, y });
    }
    for (let y = topRightCorner.y; y <= bottomRightCorner.y; y++) { // right column
        wallTiles.push({ x: topRightCorner.x, y });
    }

    return {
        width,
        height,
        corners,
        wallTiles
    }
}

const generateBase = (width, height) => {
    let map = [];

    for(let y = 0; y < height; y++) {
        let row = [];
        for(let x = 0; x < width; x++) {
            row[x] = 0;
        }
        map.push(row);
    }

    return map;
}


export {
    generate
}