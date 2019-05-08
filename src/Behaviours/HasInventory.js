import _ from 'lodash'
import { attachProperty } from '../Utils/EntityHelpers'

class HasInventory {
  constructor(entity, items = []) {
    attachProperty(this, entity, 'items', items)

    this.functions = {
        addItem: item => {
            this.items = this.items.concat(item);
        },
        getItems: () => {
            return this.items;
        },
    }
  }
}

export default HasInventory;
