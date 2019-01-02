/* eslint-disable no-param-reassign */

// generates the 4 by 4 style grid, also know as isaac clone, to be put all on one screen
import _ from 'lodash';
import Enemy from '../Enemy/Enemy';
import StageProp from '../StageProp/StageProp';

const Random = require('random-js')();

const fillBoundaryWalls = (dungeonTemplate, map) => {
  for (let x = 0; x < dungeonTemplate.mapWidth; x += 1) { // top row
    map[x][0] = 1;
  }
  for (let x = 0; x < dungeonTemplate.mapWidth; x += 1) { // bottom row
    map[x][dungeonTemplate.mapWidth - 1] = 1;
  }
  for (let y = 0; y < dungeonTemplate.mapHeight; y += 1) { // left column
    map[0][y] = 1;
  }
  for (let y = 0; y < dungeonTemplate.mapHeight; y += 1) { // right column
    map[dungeonTemplate.mapHeight - 1][y] = 1;
  }
};

const fillCrossSectionWalls = (dungeonTemplate, map) => {
  for (let x = 0; x < dungeonTemplate.mapWidth; x += 1) {
    map[x][dungeonTemplate.crossSectionY] = 1; // horizontal wall
  }

  for (let y = 0; y < dungeonTemplate.mapHeight; y += 1) { // starts from 1 so that the very top remains a 1
    map[dungeonTemplate.crossSectionX][y] = 1; // vertical wall
  }
};

const patchWalls = (dungeonTemplate, map) => {
  for (let y = 0; y < dungeonTemplate.mapWidth; y += 1) {
    for (let x = 0; x < dungeonTemplate.mapHeight; x += 1) {
      if (map[x][y] === 1 && map[x][y + 1] !== 1) {
        map[x][y] = 2;
      }
    }
  }
};

/**
 *
 * @param {object} dungeonTemplate the dungeon template
 * @param {object} map the stage map
 */
const carveDoors = (dungeonTemplate, map) => {
  // top
  let startTile = Random.integer(2, dungeonTemplate.sectionHeight - 1);
  let alt = Random.bool();
  map[dungeonTemplate.crossSectionX][startTile] = 0;
  if (alt) {
    map[dungeonTemplate.crossSectionX][startTile - 1] = 0;
  } else {
    map[dungeonTemplate.crossSectionX][startTile + 1] = 0;
  }

  // bottom
  startTile = Random.integer(11, dungeonTemplate.sectionHeight - 1);
  alt = Random.bool();
  map[dungeonTemplate.crossSectionX][startTile] = 0;
  if (alt) {
    map[dungeonTemplate.crossSectionX][startTile - 1] = 0;
  } else {
    map[dungeonTemplate.crossSectionX][startTile + 1] = 0;
  }

  // left
  startTile = Random.integer(2, dungeonTemplate.sectionWidth - 1);
  alt = Random.bool();
  map[startTile][dungeonTemplate.crossSectionY] = 0;
  if (alt) {
    map[startTile - 1][dungeonTemplate.crossSectionY] = 0;
  } else {
    map[startTile + 1][dungeonTemplate.crossSectionY] = 0;
  }

  // right
  startTile = Random.integer(11, dungeonTemplate.sectionWidth - 1);
  alt = Random.bool();
  map[startTile][dungeonTemplate.crossSectionY] = 0;
  if (alt) {
    map[startTile - 1][dungeonTemplate.crossSectionY] = 0;
  } else {
    map[startTile + 1][dungeonTemplate.crossSectionY] = 0;
  }
};

const generateRoomData = (dungeonTemplate, map, roomDirection) => {
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

const generateRooms = (dungeonTemplate, map) => {
  const roomsToBuild = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight'];
  let allStageObjects = [];

  roomsToBuild.forEach((roomToBuild) => {
    const { stageObjects } = generateRoomData(dungeonTemplate, map, roomToBuild);
    allStageObjects = allStageObjects.concat(stageObjects);
  });

  return {
    rooms: [],
    stageObjects: allStageObjects,
  };
};

const generateMap = (dungeonTemplate) => {
  const map = [];

  for (let y = 0; y < dungeonTemplate.mapWidth; y += 1) {
    const row = [];
    for (let x = 0; x < dungeonTemplate.mapHeight; x += 1) {
      row[x] = 0;
    }
    map.push(row);
  }

  return map;
};

/**
 *
 * @param {object} dungeonTemplate
 */
const generate = (dungeonTemplate) => {
  dungeonTemplate.sectionWidth = 7;
  dungeonTemplate.sectionHeight = 7;
  const mapWidth = (dungeonTemplate.sectionWidth * 2) + 3;
  const mapHeight = (dungeonTemplate.sectionHeight * 2) + 3;

  dungeonTemplate.mapWidth = mapWidth;
  dungeonTemplate.mapHeight = mapHeight;

  dungeonTemplate.crossSectionX = Math.floor(dungeonTemplate.mapWidth / 2);
  dungeonTemplate.crossSectionY = Math.floor(dungeonTemplate.mapHeight / 2);

  const map = generateMap(dungeonTemplate);

  fillCrossSectionWalls(dungeonTemplate, map);
  fillBoundaryWalls(dungeonTemplate, map);
  carveDoors(dungeonTemplate, map);

  const { stageObjects } = generateRooms(dungeonTemplate, map);

  patchWalls(dungeonTemplate, map);

  return {
    map,
    theme: dungeonTemplate.theme,
    stageObjects,
  };
};

export {
  generate,
};
