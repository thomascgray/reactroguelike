import _ from 'lodash'

class HasArchetype {
    constructor(archetype) {
        this.archetype = _.clone(archetype);

        this.functions = {
            setArchetype: value => {
                this.archetype = value;
                return this.archetype;
            },
            getArchetype: () => {
                return this.archetype;
            }
        }
    }

    toState() {
        return {
            archetype: this.archetype
        }
    }
}

export default HasArchetype;
