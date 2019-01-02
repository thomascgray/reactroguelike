const Random = require('random-js')(); // uses the nativeMath engine

const isBetween = (value, lowerBound, upperBound) => value > lowerBound && value < upperBound;
const isBetweenIncl = (value, lowerBound, upperBound) => value >= lowerBound && value <= upperBound;

const generate = (dungeonTemplate) => {
  if (dungeonTemplate.type === 'rooms') {
    const map = generateMap(dungeonTemplate.width, dungeonTemplate.height);
    const rooms = generateRooms(dungeonTemplate, map);

    return {
      map,
      rooms,
    };
  }
};

const generateRooms = (dungeonTemplate, map) => {
  const allRooms = [];

  dungeonTemplate.rooms.forEach((roomTemplate) => {
    for (let i = 0; i < roomTemplate.count; i++) {
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
      allRooms.forEach((oldRoom) => {
        if (isBetweenIncl(room.corners.topLeftCorner.x, oldRoom.corners.topLeftCorner.x, oldRoom.corners.topRightCorner.x)) {
          if (isBetweenIncl(room.corners.topLeftCorner.y, oldRoom.corners.topLeftCorner.y, oldRoom.corners.topRightCorner.y)) {
            isOverlapping = true;
          }
        }
      });

      console.log('isOverlapping', isOverlapping);
      if (!isOverlapping) {
        allRooms.push(room);
      }
    }
  });


  allRooms.forEach((room) => {
    room.wallTiles.forEach((tile) => {
      map[tile.x][tile.y] = 1;
    });
  });
};

const generateSmallRoom = (dungeonTemplate) => {
  let width = Random.integer(4, 7);
  let height = Random.integer(4, 7);

  width--;
  height--;

  const topLeftCorner = {
    x: Random.integer(0, (dungeonTemplate.width - 1) - width), // random number between 0 and map width - room width
    y: Random.integer(0, (dungeonTemplate.height - 1) - height), // random number between 0 and map width - room width
  };
  const bottomLeftCorner = {
    x: topLeftCorner.x,
    y: topLeftCorner.y + height,
  };
  const topRightCorner = {
    x: topLeftCorner.x + width,
    y: topLeftCorner.y,
  };
  const bottomRightCorner = {
    x: topLeftCorner.x + width,
    y: topLeftCorner.y + height,
  };

  const corners = {
    topLeftCorner,
    bottomLeftCorner,
    topRightCorner,
    bottomRightCorner,
  };

  const wallTiles = [];
  const directionWallTiles = {
    north: [],
    east: [],
    south: [],
    west: [],
  };

  let tile = {};
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
    directionWallTiles,
  };
};

const generateMap = (width, height) => {
  const map = [];

  for (let y = 0; y < width; y++) {
    const row = [];
    for (let x = 0; x < height; x++) {
      row[x] = 0;
    }
    map.push(row);
  }

  return map;
};

export {
  generate,
};
