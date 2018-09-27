import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'

export default (loots, player, loot) => {
    // get active weapon from player, etc.

    loot.getItems().forEach(item => {
        player.addItem(item);
        LogMessage(`you found ${item.name}`)
    });

    _.remove(loots, l => l.id === loot.id);
}