import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'

export default (loots, player, loot) => {
    // get active weapon from player, etc.

    loot.HasInventory.getItems().forEach(item => {
        player.HasInventory.addItem(item);
        LogMessage(`you found ${item.name}`)
    });

    _.remove(loots, l => l.HasId.getId() === loot.HasId.getId());
}