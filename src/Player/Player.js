import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasDirection from '../Behaviours/HasDirection'
import HasArchetype from '../Behaviours/HasArchetype'
import HasBody from '../Behaviours/HasBody'
import HasPowers from '../Behaviours/HasPowers'

import { composeEntity } from '../Utils/EntityHelpers'

class Player {
  constructor({ position, hp = 10, archetype = 'druid', powers = [] }) {
    composeEntity({
      entity: this,
      behaviours: [
        new HasId(this),
        new HasPosition(this, position),
        new HasDirection(this),
        new HasArchetype(this, archetype),
        new HasHp(this, hp),
        new HasInventory(this),
        new HasBody(this),
      ]
    })

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
}

export default Player;
