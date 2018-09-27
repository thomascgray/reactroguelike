import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import Uuid from 'uuid/v4'

class EnemyEntity {
  constructor(position) {
    this.id = Uuid()
    this.behaviours = [
      new HasInventory(),
      new HasHp(3),
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

export default EnemyEntity;
