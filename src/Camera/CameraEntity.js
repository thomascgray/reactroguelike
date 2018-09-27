import HasPixelPosition from '../Behaviours/HasPixelPosition'

class EnemyEntity {
  constructor(position) {
    this.behaviours = [
      new HasPixelPosition(position),
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

    return state;
  }
}

export default EnemyEntity;
