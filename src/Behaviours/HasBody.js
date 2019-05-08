import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
class HasBody {
    constructor(entity, bodyType, size, bodyParts = []) {
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
            getBodyPart: bodyPartName => {
                return this.body.bodyParts[bodyPartName];
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
            equipItemOntoBodypart: (item, bodyPartName) => {
                this.body.bodyParts[bodyPartName].isWearing.push(_.clone(item))
                return this.body.bodyParts;
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
            getBodyPartWearingItem: itemId => {
                let bodyPartWearingItem = null;
                let bodyPartNameMatch = null;

                Object.keys(this.body.bodyParts).forEach(bodyPartName => {
                    const isWearingItems = _.defaultTo(this.body.bodyParts[bodyPartName].isWearing, []);
                    const isBodyPartWearingItem = isWearingItems.some(item => {
                        return item.id === itemId;
                    });

                    if (isBodyPartWearingItem) {
                        bodyPartNameMatch = bodyPartName
                        bodyPartWearingItem = this.body.bodyParts[bodyPartName];
                    }
                });

                if (bodyPartNameMatch === null && bodyPartWearingItem === null) {
                    return null;
                }

                return {
                    bodyPartName: bodyPartNameMatch,
                    bodyPart: bodyPartWearingItem
                };
            },
        }

        this.functions.equipItem = (item, bodyPartName) => {
            const bodyPart = this.functions.getBodyPart(bodyPartName);
            
            if (item.equipVerb === 'hold') {
                const bodyPartHoldingItem = this.functions.getBodyPartHoldingItem(item.id);
                if (bodyPart.isHolding.length + 1 > bodyPart.holdCapacity) {
                    LogMessage(`you cannot hold any more items in your ${bodyPartName}`)
                    return;
                }
                
                if (bodyPartHoldingItem) {
                    LogMessage(`you are already holding your *${item.name}*`)
                    return;
                }
    
                this.functions.equipItemIntoBodypart(item, bodyPartName);
                LogMessage(`you grab your ${item.name} with your ${bodyPartName}`)
            }

            if (item.equipVerb === 'wear') {
                this.functions.equipItemOntoBodypart(item, bodyPartName);
                LogMessage(`you put your ${item.name} onto your ${bodyPartName}`)
            }
        };
      
        this.functions.getWornItemsByBodyPartName = () => {
            const bodyParts = this.functions.getBodyParts();
            const wornItems = {}

            Object.keys(bodyParts).forEach(bodyPartName => {
                const bodyPart = bodyParts[bodyPartName];
                if (bodyPart.isWearing && bodyPart.isWearing.length >= 1) {
                    if (wornItems[bodyPartName] == undefined) {
                        wornItems[bodyPartName] = [];
                    }
                    wornItems[bodyPartName] = wornItems[bodyPartName].concat(bodyPart.isWearing)
                }
            })

            return wornItems;
        }
      
        this.functions.getHeldItemsByBodyPartName = () => {
            const bodyParts = this.functions.getBodyParts();
            const heldItems = {}

            Object.keys(bodyParts).forEach(bodyPartName => {
                const bodyPart = bodyParts[bodyPartName];
                if (bodyPart.isHolding && bodyPart.isHolding.length >= 1) {
                    if (heldItems[bodyPartName] == undefined) {
                        heldItems[bodyPartName] = [];
                    }
                    heldItems[bodyPartName] = heldItems[bodyPartName].concat(bodyPart.isHolding)
                }
            })

            return heldItems;
        }

        this.functions.getEquippedItems = () => {
            return _.flatten(_.map(this.functions.getBodyParts(), bodyPart => {
                let items = []
                items = items.concat(bodyPart.isHolding ? bodyPart.isHolding : [])
                items = items.concat(bodyPart.isWearing ? bodyPart.isWearing : [])
                return items;
            }));
        }

        this.functions.unequipItem = item => {
            if (item.equipVerb === 'hold') {
                const bodyPartHoldingItem = this.functions.getBodyPartHoldingItem(item.id);
    
                bodyPartHoldingItem.bodyPart.isHolding = bodyPartHoldingItem.bodyPart.isHolding.filter(i => {
                    i.id != item.id
                });
                
                LogMessage(`you put your ${item.name} away`)
            }

            if (item.equipVerb === 'wear') {
                const bodyPartWearingItem = this.functions.getBodyPartWearingItem(item.id);
    
                bodyPartWearingItem.bodyPart.isWearing = bodyPartWearingItem.bodyPart.isWearing.filter(i => {
                    i.id != item.id
                });
                
                LogMessage(`you take off your ${item.name}`)
            }
        }
    }

    toState() {
        return {
            body: this.body
        }
    }
}

export default HasBody;
