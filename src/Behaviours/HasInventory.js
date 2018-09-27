import _ from 'lodash'

class HasInventory {
  constructor(items = []) {
    this.items = _.cloneDeep(items);

    this.functions = {
        addItem: item => {
            this.items.push(_.cloneDeep(item))
        },
        getItems: () => {
            return this.items;
        }
    }
  }

  toState () {
      
  }
}

export default HasInventory;
