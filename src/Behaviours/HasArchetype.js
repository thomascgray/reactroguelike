import { attachProperty } from '../Utils/EntityHelpers'

class HasArchetype {
    constructor(entity, archetype) {
        attachProperty(this, entity, 'archetype', archetype)
    }

    setArchetype (value) {
        this.archetype = value;
        return this.archetype;
    }
    
    getArchetype () {
        return this.archetype;
    }
}

export default HasArchetype;
