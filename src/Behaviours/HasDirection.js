import _ from 'lodash'

class HasDirection {
    constructor(direction) {
        this.direction = _.clone(direction);

        this.functions = {
            setDirection: value => {
                this.direction = value;
                return this.direction;
            },
            getDirection: () => {
                return this.direction;
            }
        }
    }

    toState() {
        return {
            direction: this.direction
        }
    }
}

export default HasDirection;
