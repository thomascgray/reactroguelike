const map = {
    LEFT: 65, // a
    UP: 87, // w 
    RIGHT: 68, // d
    DOWN: 83, // s
    INTERACT: 69, // e
    SPACE: 32, // space bar
    INVENTORY: 73, // i
    CHARACTER: 67, // c
    NUMBER_ONE: 49, // 1
    NUMBER_TWO: 50, // 2
    NUMBER_THREE: 51, // 3
    ESCAPE: 27, // escape
}

map.MOVEMENT_KEYS = [map.UP, map.DOWN, map.LEFT, map.RIGHT]
map.POWER_KEYS = [map.NUMBER_ONE, map.NUMBER_TWO, map.LEFT, map.NUMBER_THREE]

export default map