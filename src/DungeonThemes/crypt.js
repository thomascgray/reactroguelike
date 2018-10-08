export default {
    lookupTables: {
        floors: [
            { id: 'a', weight: 60 },
            { id: 'b', weight: 10 },
            { id: 'c', weight: 10 },
            { id: 'd', weight: 10 },
            { id: 'e', weight: 10 },
        ],
        walls: [
            { id: 'a', weight: 60 },
            { id: 'b', weight: 10 },
            { id: 'c', weight: 10 },
            { id: 'd', weight: 10 },
            { id: 'cracked', weight: 10 },
        ],
    },
    floors: {
        a: require('../Assets/td_world/td_world_floor_mossy_b.png'),
        b: require('../Assets/td_world/td_world_floor_mossy_a.png'),
        c: require('../Assets/td_world/td_world_floor_mossy_c.png'),
        d: require('../Assets/td_world/td_world_floor_mossy_d.png'),
        e: require('../Assets/td_world/td_world_floor_mossy_e.png'),
    },
    walls: {
        horizontal: {
            a: require('../Assets/td_world/td_world_wall_crypt_h_a.png'),
            b: require('../Assets/td_world/td_world_wall_crypt_h_b.png'),
            c: require('../Assets/td_world/td_world_wall_crypt_h_c.png'),
            d: require('../Assets/td_world/td_world_wall_crypt_h_d.png'),
            cracked: require('../Assets/td_world/td_world_wall_crypt_h_crack.png'),
        },
        vertical: {
            a: require('../Assets/td_world/td_world_wall_crypt_v_a.png'),
            b: require('../Assets/td_world/td_world_wall_crypt_v_b.png'),
            c: require('../Assets/td_world/td_world_wall_crypt_v_c.png'),
            d: require('../Assets/td_world/td_world_wall_crypt_v_d.png'),
            cracked: require('../Assets/td_world/td_world_wall_crypt_v_crack.png'),
        },
    },
}