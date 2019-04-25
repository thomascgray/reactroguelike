import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasDirection from '../Behaviours/HasDirection'
import HasArchetype from '../Behaviours/HasArchetype'
import HasBody from '../Behaviours/HasBody'
import HasPowers from '../Behaviours/HasPowers'

import _ from 'lodash';
import { attachFunctions, toState } from '../Utils/BehaviourHelpers'

class Player {
  /**
   * 
   * @param {Object} object
   * @param {Object} object.position
   * @param {number} object.position.x
   * @param {number} object.position.y
   */
  constructor({ position, hp = 10, archetype, powers = [] }) {
    this.behaviours = [
      new HasInventory(),
      new HasHp(hp),
      new HasPosition(position),
      new HasId(),
      new HasDirection(),
      new HasArchetype(archetype),
      new HasBody('humanoid', 'medium'),
      new HasPowers(powers),
    ]

    attachFunctions(this, this.behaviours)

    this.dominantLimb = 'right';
  }

  getUnarmedMeleeWeapon () {
    return {
      name: 'fists',
      type: 'melee',
      damageType: 'unarmed',
      damage: '1d1'
    }
  }

  getActiveMeleeWeapon () {
    // TODO based on what handed you are and whats equipped, hit them with whats in your hand
    return this.HasBody.getBodyParts()['right hand'].isHolding[0];
  }

  getUnequippedItems () {
    const equippedItems = this.HasBody.getEquippedItems();
    const equippedItemIds = equippedItems.map(i => i.id)

    const allItems = this.HasInventory.getItems();

    return allItems.filter(i => {
      return !equippedItemIds.includes(i.id)
    })
  }

  setActiveMeleeWeapon (itemId) {
    this.HasInventory.getItems().forEach(i => {
      this.appendItemDataById(i.id, {
        isActive: false
      })  
    });
    
    this.appendItemDataById(itemId, {
      isActive: true
    })
  }

  toState () {
    return toState(this.behaviours)
  }
}

export default Player;
