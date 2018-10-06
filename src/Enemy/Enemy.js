import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasArchetype from '../Behaviours/HasArchetype'
import IsCollidable from '../Behaviours/IsCollidable'

import { attachFunctions, toState } from '../Utils/BehaviourHelpers'

class EnemyEntity {
  constructor({ position, hp = 3, archetype, isCollidable = true }) {
    this.behaviours = [
      new HasInventory(),
      new HasHp(hp),
      new HasPosition(position),
      new HasId(),
      new HasArchetype(archetype),
      new IsCollidable(isCollidable)
    ]

    attachFunctions(this, this.behaviours)
  }

  toState () {
    return toState(this.behaviours, 'Enemy')
  }
}

export default EnemyEntity;
