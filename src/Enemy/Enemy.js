import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasArchetype from '../Behaviours/HasArchetype'
import IsCollidable from '../Behaviours/IsCollidable'

// import { attachBehaviours, toState } from '../Utils/EntityHelpers'

class Enemy {
  constructor({ position, hp = 3, archetype, isCollidable = true }) {
    this.behaviours = [
      new HasId(),
      new HasInventory(),
      new HasArchetype(archetype),
      new HasPosition(position),
      new IsCollidable(isCollidable),
      new HasHp(hp),
    ]

    // attachBehaviours(this, this.behaviours)
  }

  toState() {
    // return toState(this.behaviours, 'Enemy')
  }
}

export default Enemy;
