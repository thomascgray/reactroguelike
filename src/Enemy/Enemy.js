import HasInventory from '../Behaviours/HasInventory';
import HasHp from '../Behaviours/HasHp';
import HasPosition from '../Behaviours/HasPosition';
import HasId from '../Behaviours/HasId';
import HasDirection from '../Behaviours/HasDirection';
import HasArchetype from '../Behaviours/HasArchetype';
import HasBody from '../Behaviours/HasBody';
import HasPowers from '../Behaviours/HasPowers';

import { composeEntity } from '../Utils/EntityHelpers';

class Enemy {
  constructor({
    position, hp = 3, archetype, isCollidable = true,
  }) {
    composeEntity({
      entity: this,
      behaviours: [
        new HasId(this),
        new HasPosition(this, position),
        new HasDirection(this),
        new HasArchetype(this, archetype),
        new HasHp(this, hp),
      ],
    });
  }
}

export default Enemy;
