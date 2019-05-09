import _ from 'lodash';
import { attachProperty } from '../Utils/EntityHelpers';
import { LogMessage } from '../Log/LogActions';

class HasBody {
  constructor(entity, bodyType, size, bodyParts = {}) {
    attachProperty(this, entity, 'bodyType', bodyType);
    attachProperty(this, entity, 'size', size);
    attachProperty(this, entity, 'bodyParts', bodyParts);
  }

  setBodyParts(value) {
    this.bodyParts = value;
    return this;
  }

  getBodyParts() {
    return this.bodyParts;
  }

  getBodyPart(bodyPartName) {
    return this.bodyParts[bodyPartName];
  }

  getBodyPartsOfType(type) {
    return Object.keys(_.pickBy(this.bodyParts, bodyPart => bodyPart.types.includes(type)));
  }

  equipItemIntoBodypart(item, bodyPartName) {
    this.bodyParts[bodyPartName].isHolding.push(_.clone(item));
    return this;
  }

  equipItemOntoBodypart(item, bodyPartName) {
    this.bodyParts[bodyPartName].isWearing.push(_.clone(item));
    return this;
  }

  getBodyPartHoldingItem(itemId) {
    let bodyPartHoldingItem = null;
    let bodyPartNameMatch = null;

    Object.keys(this.bodyParts).forEach((bodyPartName) => {
      const isHoldingItems = _.defaultTo(this.bodyParts[bodyPartName].isHolding, []);
      const isBodyPartHoldingItem = isHoldingItems.some(item => item.id === itemId);

      if (isBodyPartHoldingItem) {
        bodyPartNameMatch = bodyPartName;
        bodyPartHoldingItem = this.bodyParts[bodyPartName];
      }
    });

    if (bodyPartNameMatch === null && bodyPartHoldingItem === null) {
      return null;
    }

    return {
      bodyPartName: bodyPartNameMatch,
      bodyPart: bodyPartHoldingItem,
    };
  }

  getBodyPartWearingItem(itemId) {
    let bodyPartWearingItem = null;
    let bodyPartNameMatch = null;

    Object.keys(this.bodyParts).forEach((bodyPartName) => {
      const isWearingItems = _.defaultTo(this.bodyParts[bodyPartName].isWearing, []);
      const isBodyPartWearingItem = isWearingItems.some(item => item.id === itemId);

      if (isBodyPartWearingItem) {
        bodyPartNameMatch = bodyPartName;
        bodyPartWearingItem = this.bodyParts[bodyPartName];
      }
    });

    if (bodyPartNameMatch === null && bodyPartWearingItem === null) {
      return null;
    }

    return {
      bodyPartName: bodyPartNameMatch,
      bodyPart: bodyPartWearingItem,
    };
  }

  equipItem(item, bodyPartName) {
    const bodyPart = this.functions.getBodyPart(bodyPartName);

    if (item.equipVerb === 'hold') {
      const bodyPartHoldingItem = this.functions.getBodyPartHoldingItem(item.id);
      if (bodyPart.isHolding.length + 1 > bodyPart.holdCapacity) {
        LogMessage(`you cannot hold any more items in your ${bodyPartName}`);
        return;
      }

      if (bodyPartHoldingItem) {
        LogMessage(`you are already holding your *${item.name}*`);
        return;
      }

      this.functions.equipItemIntoBodypart(item, bodyPartName);
      LogMessage(`you grab your ${item.name} with your ${bodyPartName}`);
    }

    if (item.equipVerb === 'wear') {
      this.functions.equipItemOntoBodypart(item, bodyPartName);
      LogMessage(`you put your ${item.name} onto your ${bodyPartName}`);
    }
  }

  getWornItemsByBodyPartName() {
    const bodyParts = this.functions.getBodyParts();
    const wornItems = {};

    Object.keys(bodyParts).forEach((bodyPartName) => {
      const bodyPart = bodyParts[bodyPartName];
      if (bodyPart.isWearing && bodyPart.isWearing.length >= 1) {
        if (wornItems[bodyPartName] === undefined) {
          wornItems[bodyPartName] = [];
        }
        wornItems[bodyPartName] = wornItems[bodyPartName].concat(bodyPart.isWearing);
      }
    });

    return wornItems;
  }

  getHeldItemsByBodyPartName() {
    const bodyParts = this.functions.getBodyParts();
    const heldItems = {};

    Object.keys(bodyParts).forEach((bodyPartName) => {
      const bodyPart = bodyParts[bodyPartName];
      if (bodyPart.isHolding && bodyPart.isHolding.length >= 1) {
        if (heldItems[bodyPartName] === undefined) {
          heldItems[bodyPartName] = [];
        }
        heldItems[bodyPartName] = heldItems[bodyPartName].concat(bodyPart.isHolding);
      }
    });

    return heldItems;
  }

  getEquippedItems() {
    return _.flatten(_.map(this.functions.getBodyParts(), (bodyPart) => {
      let items = [];
      items = items.concat(bodyPart.isHolding ? bodyPart.isHolding : []);
      items = items.concat(bodyPart.isWearing ? bodyPart.isWearing : []);
      return items;
    }));
  }

  unequipItem(item) {
    if (item.equipVerb === 'hold') {
      const bodyPart = this.functions.getBodyPartHoldingItem(item.id);

      bodyPart.bodyPart.isHolding = bodyPart.bodyPart.isHolding.filter(i => i.id !== item.id);

      LogMessage(`you put your ${item.name} away`);
    }

    if (item.equipVerb === 'wear') {
      const bodyPart = this.functions.getBodyPartWearingItem(item.id);

      bodyPart.bodyPart.isWearing = bodyPart.bodyPart.isWearing.filter(i => i.id !== item.id);

      LogMessage(`you take off your ${item.name}`);
    }
  }
}

export default HasBody;
