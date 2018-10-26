import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
class HasBody {
    constructor(bodyType, size, bodyParts = []) {
        this.body = {
            size,
            bodyParts: require(`./BodyPartKits/${bodyType}`).default
        }

        this.functions = {
            setBodyParts: value => {
                this.body.bodyParts = value;
                return this.body.bodyParts;
            },
            getBodyParts: () => {
                return this.body.bodyParts;
            },
            getBodyPartsOfType: type => {
                return Object.keys(_.pickBy(this.body.bodyParts, bodyPart => {
                    return bodyPart.types.includes(type);
                }))
            },
            equipItemIntoBodypart: (item, bodyPartName) => {
                this.body.bodyParts[bodyPartName].isHolding.push(_.clone(item))
                return this.body.bodyParts;
            },
            unequipItem: item => {
                console.log(`unequipping ${item.name}`);
            },
            isHoldingItem: item => {
                return Object.keys(this.body.bodyParts).some(bodyPart => {
                    return this.body.bodyParts[bodyPart].canHold && this.body.bodyParts[bodyPart].isHolding && this.body.bodyParts[bodyPart].isHolding.id === item.id
                });
            }
        }

        this.functions.equipItem = (item, bodyPartName) => {
            // if the item is already equipped on the character somewhere, unequip it
            // if (this.isHoldingItem(item)) {
            //     // unequip the item before we re-equip it
            //     this.unequipItem(item);
            // }
            this.functions.equipItemIntoBodypart(item, bodyPartName);
            LogMessage(`you grab your ${item.name} with your ${bodyPartName}`)
        };

        return;
    }

    toState() {
        return {
            body: this.body
        }
    }
}

export default HasBody;
