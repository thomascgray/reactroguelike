import { attachProperty } from '../Utils/EntityHelpers'

class IsCollidable {
    constructor(entity, isCollidable) {
        attachProperty(this, entity, 'isCollidable', isCollidable)

        this.functions = {
            setIsCollidable: value => {
                this.isCollidable = value;
                return this.isCollidable;
            },
            getIsCollidable: () => {
                return this.isCollidable;
            }
        }
    }
}

export default IsCollidable;
