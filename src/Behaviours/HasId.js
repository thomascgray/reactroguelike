import Uuid from 'uuid/v4'
import { attachProperty } from '../Utils/EntityHelpers'

class HasId {
    constructor(entity, id = null) {
        if (!id) {
            id = Uuid();
        }

        attachProperty(this, entity, 'id', id)
    }

    getId () {
        return this.id
    }

    setId (id ) {
        this.id = id;
        return this;
    }
}

export default HasId;
