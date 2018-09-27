import _ from 'lodash'

class HasPosition {
    constructor(position = { x: 0, y:0 }) {
        this.position = _.cloneDeep(position);

        this.functions = {
            setPosition: position => {
                this.position = position;
                return this.position;
            },
            getPosition: () => {
                return this.position;
            },
            moveLeft: (distance = 1) => {
                this.position.x -= distance
                return this.position
            },
            moveRight: (distance = 1) => {
                this.position.x += distance
                return this.position
            },
            moveUp: (distance = 1) => {
                this.position.y -= distance
                return this.position
            },
            moveDown: (distance = 1) => {
                this.position.y += distance
                return this.position
            },
        }
    }

    toState() {
        return {
            position: this.position
        }
    }
}

export default HasPosition;
