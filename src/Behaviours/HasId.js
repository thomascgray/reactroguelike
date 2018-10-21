import _ from 'lodash'
import Uuid from 'uuid/v4'

class HasId {
    constructor(id = null) {
        if (!id) {
            id = Uuid();
        }

        this.id = _.clone(id);

        this.functions = {
            getId: () => {
                return this.id
            },
            setId: id => {
                this.id = id;
                return this.id;
            }
        }
    }

    toState() {
        return { id: this.id };
    }
}

export default HasId;
