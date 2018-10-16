import _ from 'lodash'

class HasBodyParts {
    constructor(bodyType, bodyParts = []) {
        this.functions = {
            setBodyParts: value => {
                this.bodyParts = value;
                return this.bodyParts;
            },
            getBodyParts: () => {
                return this.bodyParts;
            },
            equipItemIntoBodypart: (item, bodyPartName) => {
                this.bodyParts[bodyPartName].isHolding = _.clone(item)
                return this.bodyParts;
            },
        }

        if (bodyParts.length > 0) {
            this.bodyParts = _.clone(bodyParts);
            return;
        }

        switch (bodyType) {
            case 'humanoid': 
                this.bodyParts = {
                    "left hand" : {
                        canHold: true,
                        isHolding: null,
                    },
                    "right hand" : {
                        canHold: true,
                        isHolding: null,
                    },
                }
        }

        return;
    }

    toState() {
        return {
            bodyParts: this.bodyParts
        }
    }
}

export default HasBodyParts;
