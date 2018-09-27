import HasInventory from '../Behaviours/HasInventory'
import HasPosition from '../Behaviours/HasPosition'
import Uuid from 'uuid/v4'

class LootEntity {
  constructor(position, items) {
    this.id = Uuid()
    this.behaviours = [
      new HasInventory(items),
      new HasPosition(position)
    ]

    this.behaviours.forEach(behaviour => {
      Object.keys(behaviour.functions).forEach(f => {
        this[f] = behaviour.functions[f]
      })
    })
  }

  toState () {
    const state = {}

    this.behaviours.forEach(behaviour => {
      state[behaviour.constructor.name] = behaviour.toState();
    });

    state.id = this.id

    return state;
  }
}

export default LootEntity;
