import HasInventory from '../Behaviours/HasInventory'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
// import { attachFunctions, toState } from '../Utils/EntityHelpers'

class LootEntity {
  constructor(position, items) {
    this.behaviours = [
      new HasInventory(items),
      new HasPosition(position),
      new HasId()
    ]

    // attachFunctions(this, this.behaviours)
  }

  toState () {
    // return toState(this.behaviours)
  }
}

export default LootEntity;
