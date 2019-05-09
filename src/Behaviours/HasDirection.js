import { attachProperty } from '../Utils/EntityHelpers'

class HasDirection {
    constructor(entity, direction) {
        attachProperty(this, entity, 'direction', direction)
    }

    setDirection (value) {
        this.direction = value;
        return this;
    }

    getDirection () {
        return this.direction;
    }
}

export default HasDirection;
