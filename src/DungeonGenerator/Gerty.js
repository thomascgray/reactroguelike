/* eslint-disable no-param-reassign */

/**
 * generates a 4 by 4 stage
 * roomcodes:
 * - TL - top left corner
 * - BL - bottom left corner
 * - TR - top right corner
 * - BR - bottom right corner
 * - T - top full horizontal
 * - B - bottom full horizontal
 * - L - left full vertical
 * - R - right full vertical
 * wallcodes:
 * - TBF - top to bottom, full
 * - LRF - left to right, full
 * - TH  - top to half way
 * - HB  - half way to bottom
 * - LH  - left to half way
 * - HR  - half way to right
 */

import _ from 'lodash';
import Enemy from '../Enemy/Enemy';
import StageProp from '../StageProp/StageProp';
import RoomLayouts from './room_layouts'
import RawMap from './raw_map'

import DungeonFloorEntity from '../Dungeon/DungeonFloor'
import DungeonEntity from '../Dungeon/Dungeon'


const Random = require('random-js')();

const sectionWidth = 7;
const mapWidth = 17;
const crossSectionX = 8;
const crossSectionY = 8;

/**
 * depending on which walls we need to build, fill in some cross sections
 * @param {*} map
 * @param {*} wallsToBeBuilt
 */
const fillCrossSectionWalls = (map, wallsToBeBuilt) => {
  if (wallsToBeBuilt.includes('TBF')) {
    for (let y = 0; y < mapWidth; y += 1) { // left column
      map[8][y] = 1;
    }
  }
  if (wallsToBeBuilt.includes('LRF')) {
    for (let x = 0; x < mapWidth; x += 1) { // left column
      map[x][8] = 1;
    }
  }
  if (wallsToBeBuilt.includes('TH')) {
    for (let y = 0; y < Math.floor(mapWidth / 2); y += 1) { // left column
      map[8][y] = 1;
    }
  }
  if (wallsToBeBuilt.includes('HB')) {
    for (let y = Math.floor(mapWidth / 2); y < mapWidth; y += 1) { // left column
      map[8][y] = 1;
    }
  }
  if (wallsToBeBuilt.includes('LH')) {
    for (let x = 0; x < Math.floor(mapWidth / 2); x += 1) { // left column
      map[x][8] = 1;
    }
  }
  if (wallsToBeBuilt.includes('HR')) {
    for (let x = Math.floor(mapWidth / 2); x < mapWidth; x += 1) { // left column
      map[x][8] = 1;
    }
  }
};

const patchWalls = (map) => {
  for (let y = 0; y < mapWidth; y += 1) {
    for (let x = 0; x < mapWidth; x += 1) {
      if (map[x][y] === 1 && map[x][y + 1] !== 1) {
        map[x][y] = 2;
      }
    }
  }
};

/**
 * carve doors into the cross section walls
 * @param {object} dungeonTemplate the dungeon template
 * @param {object} map the stage map
 */
const carveDoors = (map) => {
  // top
  let startTile = Random.integer(2, sectionWidth - 1);
  let alt = Random.bool();
  map[crossSectionX][startTile] = 0;
  if (alt) {
    map[crossSectionX][startTile - 1] = 0;
  } else {
    map[crossSectionX][startTile + 1] = 0;
  }

  // bottom
  startTile = Random.integer(11, sectionWidth - 1);
  alt = Random.bool();
  map[crossSectionX][startTile] = 0;
  if (alt) {
    map[crossSectionX][startTile - 1] = 0;
  } else {
    map[crossSectionX][startTile + 1] = 0;
  }

  // left
  startTile = Random.integer(2, sectionWidth - 1);
  alt = Random.bool();
  map[startTile][crossSectionY] = 0;
  if (alt) {
    map[startTile - 1][crossSectionY] = 0;
  } else {
    map[startTile + 1][crossSectionY] = 0;
  }

  // right
  startTile = Random.integer(11, sectionWidth - 1);
  alt = Random.bool();
  map[startTile][crossSectionY] = 0;
  if (alt) {
    map[startTile - 1][crossSectionY] = 0;
  } else {
    map[startTile + 1][crossSectionY] = 0;
  }
};

const _generateRoomData = (map, roomCodes) => {
  let xoffset;
  let yoffset;

  switch (roomDirection) {
    case 'topLeft':
      xoffset = 1;
      yoffset = 1;
      break;
    case 'topRight':
      xoffset = 9;
      yoffset = 1;
      break;
    case 'bottomLeft':
      xoffset = 1;
      yoffset = 9;
      break;
    case 'bottomRight':
      xoffset = 9;
      yoffset = 9;
      break;
    default:
      break;
  }

  // const roomTemplateId = Random.integer(1, 6);
  const roomTemplateId = 1;
  const template = _.cloneDeep(require(`../SectionTemplates/${roomTemplateId}.json`)); // eslint-disable-line

  if (!template.enemies) {
    template.enemies = [];
  }
  if (!template.stageProps) {
    template.stageProps = [];
  }

  // change the real map to be affected by the template map
  // but find anything that isnt a number and match it to the stage props or enemies
  for (let x = 0; x < 7; x += 1) {
    for (let y = 0; y < 7; y += 1) {
      if (typeof template.map[y][x] === 'string') {
        // its a sub
        // floor under subs is always a normal floor

        const thing = template.placeholders[template.map[y][x]];
        if (thing.placeholder_type === 'enemy') {
          thing.position = {
            x,
            y,
          };
          template.enemies.push(thing);
        }

        map[x + xoffset][y + yoffset] = 0;
      } else {
        map[x + xoffset][y + yoffset] = template.map[y][x];
      }
    }
  }

  // get the enemies, and transform their positions
  const enemies = template.enemies.map((enemy) => {
    enemy.position.x += xoffset;
    enemy.position.y += yoffset;
    return new Enemy({
      position: enemy.position,
      hp: 5,
      archetype: enemy.archetype,
    });
  });

  // get the stage props, and transform their positions
  const stageProps = template.stageProps.map((stageProp) => {
    stageProp.position.x += xoffset;
    stageProp.position.y += yoffset;
    return new StageProp({
      position: stageProp.position,
      hp: 5,
      archetype: stageProp.archetype,
    });
  });

  // add stairs for certain scenarios
  // if (roomDirection === 'bottomRight') {

  // }

  return {
    stageObjects: [...enemies, ...stageProps],
  };
};

const generateRoom = () => {

}

const generateRooms = (map, roomCodes) => {
  let stageObjects = [];
  roomCodes.forEach(roomCode => {

  });
}

/**
 * based on the supplied room codes, determine which walls need to be built
 * @param {string[]} roomCodes 
 */
const getWallsToBeBuilt = roomCodes => {
  let wallsToBeBuilt = ['TBF', 'LRF'];

  if (roomCodes.includes('T')) {
    _.pull(wallsToBeBuilt, 'TBF');
    wallsToBeBuilt.push('HB')
  }
  if (roomCodes.includes('B')) {
    _.pull(wallsToBeBuilt, 'TBF');
    wallsToBeBuilt.push('TH')
  }
  if (roomCodes.includes('L')) {
    _.pull(wallsToBeBuilt, 'LRF');
    wallsToBeBuilt.push('HR')
  }
  if (roomCodes.includes('R')) {
    _.pull(wallsToBeBuilt, 'LRF');
    wallsToBeBuilt.push('LH')
  }

  return wallsToBeBuilt;
}

/**
 * main generate function
 * 
 * @param {object} dungeonTemplate
 * @param {string} dungeonTemplate.theme
 */
const generate = (dungeonTemplate) => {
  console.log('gerty generate');
  const dungeon = new DungeonEntity({
    theme: dungeonTemplate.theme
  });

  let floorCount = 3;

  for (let i = 0; i < floorCount; i++) {
    let map = _.cloneDeep(RawMap);
    const roomCodes = _.sample(RoomLayouts);
    const wallsToBeBuilt = getWallsToBeBuilt(roomCodes);

    fillCrossSectionWalls(map, wallsToBeBuilt);
    carveDoors(map);
    generateRooms(map, roomCodes);

    // const { stageObjects } = generateRooms(map, roomCodes);

    patchWalls(map);

    const floor = new DungeonFloorEntity({
      map,
    })

    dungeon.addFloor(floor)
  }

  return dungeon
};

export {
  generate,
};
