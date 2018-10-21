import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasDirection from '../Behaviours/HasDirection'
import HasArchetype from '../Behaviours/HasArchetype'
import HasBodyParts from '../Behaviours/HasBodyParts'
import HasPowers from '../Behaviours/HasPowers'

import _ from 'lodash';
import { attachFunctions, toState } from '../Utils/BehaviourHelpers'

/**
 * @class Player
 * @property HasInventory
 * @property HasHp
 * @property HasPosition
 * @property HasId
 * @property HasDirection
 * @property HasArchetype
 * @property HasBodyParts
 * @property HasPowers
 */
class Player {
  constructor({ position, hp = 10, archetype, powers = [] }) {
    this.behaviours = [
      new HasInventory(),
      new HasHp(hp),
      new HasPosition(position),
      new HasId(),
      new HasDirection(),
      new HasArchetype(archetype),
      new HasBodyParts('humanoid'),
      new HasPowers(powers),
    ]

    attachFunctions(this, this.behaviours)

    this.dominantLimb = 'right';
  }

  getUnarmedMeleeWeapon () {
    return {
      name: 'fists',
      type: 'melee',
      damage: 1
    }
  }

  getActiveMeleeWeapon () {
    // TODO based on what handed you are and whats equipped, hit them with whats in your hand
    return this.HasBodyParts.getBodyParts()['right hand'].isHolding;
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
