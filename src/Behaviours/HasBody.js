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
            getBodyPartHoldingItem: item => {
                const bodyPartNameHoldingItem = Object.keys(this.body.bodyParts).find(bodyPartName => { // find the first bodypartname...
                    return _.get(this.body.bodyParts, `[${bodyPartName}].isHolding`, []).some(itemBeingHeld => {
                    // return this.body.bodyParts[bodyPartName].isHolding && this.body.bodyParts[bodyPartName].isHolding.some(itemBeingHeld => {

                        itemBeingHeld.id === item.id;
                    });
                });

                console.log('bodyPartNameHoldingItem', bodyPartNameHoldingItem);
            },
        }

        this.functions.equipItem = (item, bodyPartName) => {
            const bodyPartHoldingItem = this.functions.getBodyPartHoldingItem(item);
            console.log('bodyPartHoldingItem', bodyPartHoldingItem);
            // if the item is already equipped on the character somewhere, unequip it
            // if (this.function.getBodyPartHoldingItem(item)) {
            //     // unequip the item before we re-equip it
            //     this.unequipItem(item);
            // }
            this.functions.equipItemIntoBodypart(item, bodyPartName);
            // LogMessage(`you grab your ${item.name} with your ${bodyPartName}`)
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
