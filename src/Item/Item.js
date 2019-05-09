import Uuid from 'uuid/v4';

class Item {
  constructor() {
    this.id = Uuid();
    this.name = 'item';
    this.type = 'weapon';
    this.isHoldableBy = [
      'hand'
    ];
    this.damage = '1d2';
    this.damageType = 'bludgeoning';
    this.ac = 0;
    this.equipVerb = 'hold';
  }
}

export default Item;
