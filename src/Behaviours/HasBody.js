import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
class HasBody {
    constructor(bodyType, size, bodyParts = []) {
        this.body = {
            size,
            bodyParts: _.cloneDeep(require(`./BodyPartKits/${bodyType}`).default)
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
                }));
            },
            equipItemIntoBodypart: (item, bodyPartName) => {
                this.body.bodyParts[bodyPartName].isHolding.push(_.clone(item))
                return this.body.bodyParts;
            },
            unequipItem: item => {
                console.log(`unequipping ${item.name}`);
            },
            getBodyPartHoldingItem: itemId => {
                let bodyPartHoldingItem = null;
                let bodyPartNameMatch = null;

                Object.keys(this.body.bodyParts).forEach(bodyPartName => {
                    const isHoldingItems = _.defaultTo(this.body.bodyParts[bodyPartName].isHolding, []);
                    const isBodyPartHoldingItem = isHoldingItems.some(item => {
                        return item.id === itemId;
                    });

                    if (isBodyPartHoldingItem) {
                        bodyPartNameMatch = bodyPartName
                        bodyPartHoldingItem = this.body.bodyParts[bodyPartName];
                    }
                });

                if (bodyPartNameMatch === null && bodyPartHoldingItem === null) {
                    return null;
                }

                return {
                    bodyPartName: bodyPartNameMatch,
                    bodyPart: bodyPartHoldingItem
                };
            },
        }

        this.functions.equipItem = (item, bodyPartName) => {
            const bodyPartHoldingItem = this.functions.getBodyPartHoldingItem(item.id);
            
            if (bodyPartHoldingItem) {
                LogMessage(`you are already holding your *${item.name}*`)
                return;
            }

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
