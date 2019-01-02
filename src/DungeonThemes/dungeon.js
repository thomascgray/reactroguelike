export default {
  lookupTables: {
    floors: [
      { id: 'a', weight: 80 },
      { id: 'b', weight: 5 },
      { id: 'c', weight: 5 },
      { id: 'd', weight: 5 },
      { id: 'e', weight: 5 },
    ],
    walls: [
      { id: 'a', weight: 80 },
      { id: 'b', weight: 5 },
      { id: 'c', weight: 5 },
      { id: 'd', weight: 5 },
      { id: 'cracked', weight: 5 },
    ],
  },
  floors: {
    a: require('../Assets/td_world/td_world_floor_cobble_a.png'),
    b: require('../Assets/td_world/td_world_floor_cobble_b.png'),
    c: require('../Assets/td_world/td_world_floor_cobble_c.png'),
    d: require('../Assets/td_world/td_world_floor_cobble_d.png'),
    e: require('../Assets/td_world/td_world_floor_cobble_e.png'),
  },
  walls: {
    horizontal: {
      a: require('../Assets/td_world/td_world_wall_stone_h_a.png'),
      b: require('../Assets/td_world/td_world_wall_stone_h_b.png'),
      c: require('../Assets/td_world/td_world_wall_stone_h_c.png'),
      d: require('../Assets/td_world/td_world_wall_stone_h_d.png'),
      cracked: require('../Assets/td_world/td_world_wall_stone_h_crack.png'),
    },
    vertical: {
      a: require('../Assets/td_world/td_world_wall_stone_v_a.png'),
      b: require('../Assets/td_world/td_world_wall_stone_v_b.png'),
      c: require('../Assets/td_world/td_world_wall_stone_v_c.png'),
      d: require('../Assets/td_world/td_world_wall_stone_v_d.png'),
      cracked: require('../Assets/td_world/td_world_wall_stone_v_crack.png'),
    },
  },
  stairs: {
    up: require('../Assets/td_world/td_world_wall_stone_stair_up.png'),
    down: require('../Assets/td_world/td_world_wall_stone_stair_down.png'),
  },
};
