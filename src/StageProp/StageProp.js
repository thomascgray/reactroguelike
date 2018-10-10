import HasInventory from '../Behaviours/HasInventory'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasArchetype from '../Behaviours/HasArchetype'
import IsCollidable from '../Behaviours/IsCollidable'

import { attachFunctions, toState } from '../Utils/BehaviourHelpers'

class StageProp {
  constructor({ position, hp = 3, archetype, isCollidable = true }) {
    this.behaviours = [
      new HasInventory(),
      new HasArchetype(archetype),
      new HasPosition(position),
      new HasId(),
      new IsCollidable(isCollidable)
    ]

    attachFunctions(this, this.behaviours)
  }

  toState () {
    return toState(this.behaviours, 'StageProp')
  }
}

export default StageProp;
