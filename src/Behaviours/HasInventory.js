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
        },
        appendItemDataById: (itemId, newData) => {
            //TODO make use of this for a player setting their active weapon
            //wait maybe thats not a thing anymore
            this.items = this.items.map(i => {
                if (i.id === itemId) {
                    i = {...i, ...newData}
                }
                return i;
            });
        }
    }
  }

  toState () {
      return this.items;
  }
}

export default HasInventory;
