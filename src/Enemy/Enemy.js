import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import { attachFunctions, toState } from '../Utils/BehaviourHelpers'

class EnemyEntity {
  constructor(position, hp = 3) {
    this.behaviours = [
      new HasInventory(),
      new HasHp(hp),
      new HasPosition(position),
      new HasId()
    ]

    attachFunctions(this, this.behaviours)
  }

  toState () {
    return toState(this.behaviours)
  }
}

export default EnemyEntity;
