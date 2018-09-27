import HasInventory from '../Behaviours/HasInventory'
import HasHp from '../Behaviours/HasHp'
import HasPosition from '../Behaviours/HasPosition'
import _ from 'lodash';

class PlayerEntity {
  constructor(position, hp = 10) {
    this.behaviours = [
      new HasInventory(),
      new HasHp(hp),
      new HasPosition(position)
    ]

    this.behaviours.forEach(behaviour => {
      Object.keys(behaviour.functions).forEach(f => {
        this[f] = behaviour.functions[f]
      })
    })
  }

  getActiveMeleeWeapon () {
    let activeMeleeWeapon = _.find(this.getItems(), item => item.isActive)

    if (!activeMeleeWeapon) {
      activeMeleeWeapon = _.find(this.getItems(), item => item.type === 'melee')
    }

    return activeMeleeWeapon;
  }


  toState () {
    const state = {}

    this.behaviours.forEach(behaviour => {
      state[behaviour.constructor.name] = behaviour.toState();
    });

    return state;
  }
}

export default PlayerEntity;
