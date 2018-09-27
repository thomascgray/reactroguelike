import _ from 'lodash'

export default (loots, player, loot) => {
    // get active weapon from player, etc.

    loot.getItems().forEach(item => {
        player.addItem(item);
    });

    _.remove(loots, l => l.id === loot.id);
}