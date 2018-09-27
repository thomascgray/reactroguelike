import _ from 'lodash'

class HasInventory {
  constructor(items = []) {
    this.items = _.cloneDeep(items);

    this.functions = {
        addItem: item => {
            this.items.push(item)
        },
        getItems: () => {
            console.log('this.items', this.items);
            return this.items;
        }
    }
  }

  toState () {
      
  }
}

export default HasInventory;
