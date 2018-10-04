import _ from 'lodash'
// import { LogMessage } from '../Log/LogActions'

export default (loots, player, loot) => {
    // get active weapon from player, etc.

   

    _.remove(loots, l => l.HasId.getId() === loot.HasId.getId());
}