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
            equipItem: (item, bodyPartName) => {
                // if the item is already equipped on the character somewhere, unequip it
                if (this.isHoldingItem(item)) {
                    // unequip the item before we re-equip it
                    this.unequipItem(item);
                }
                this.equipItemIntoBodypart(item, bodyPartName);
                LogMessage(`you grab your ${item.name} with your ${bodyPartName}`)
            },
            unequipItem: item => {

            },
            isHoldingItem: item => {
                return Object.keys(this.bodyParts).some(bodyPart => {
                    return this.bodyParts[bodyPart].canHold && this.bodyParts[bodyPart].isHolding && this.bodyParts[bodyPart].isHolding.id === item.id
                });
            }
        }

        if (bodyParts.length > 0) {
            this.bodyParts = _.clone(bodyParts);
            return;
        }

        switch (bodyType) {
            case 'humanoid':
                this.bodyParts = require('./BodyPartKits/humanoid').default;
                break;
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
