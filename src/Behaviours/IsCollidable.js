import _ from 'lodash'

class IsCollidable {
    constructor(isCollidable) {
        this.isCollidable = _.clone(isCollidable);

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

    toState() {
        return {
            isCollidable: this.isCollidable
        }
    }
}

export default IsCollidable;
