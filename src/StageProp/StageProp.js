import HasInventory from '../Behaviours/HasInventory'
import HasPosition from '../Behaviours/HasPosition'
import HasId from '../Behaviours/HasId'
import HasArchetype from '../Behaviours/HasArchetype'
import IsCollidable from '../Behaviours/IsCollidable'
import { composeEntity } from '../Utils/EntityHelpers'

class StageProp {
  constructor({ position, hp = 3, archetype, isCollidable = true }) {

    composeEntity({
      entity: this,
      behaviours: [
        new HasId(this),
        new HasInventory(this),
        new HasArchetype(this, archetype),
        new HasPosition(this, position),
        new IsCollidable(this, isCollidable)
      ]
    })
  }
}

export default StageProp;
