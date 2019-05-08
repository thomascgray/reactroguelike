import _ from 'lodash'
import { attachProperty } from '../Utils/EntityHelpers'

class HasDirection {
    constructor(entity, direction) {
        attachProperty(this, entity, 'direction', direction)

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
}

export default HasDirection;
