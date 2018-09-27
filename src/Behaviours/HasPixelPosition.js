import _ from 'lodash'

class HasPixelPosition {
    constructor(position = { x: 0, y:0 }) {
        this.position = _.cloneDeep(position);

        this.functions = {
            setPosition: position => {
                this.position += position;
                return this.position;
            },
            getPosition: () => {
                return this.position;
            },
        }
    }

    toState() {
        return {
            position: this.position
        }
    }
}

export default HasPixelPosition;
