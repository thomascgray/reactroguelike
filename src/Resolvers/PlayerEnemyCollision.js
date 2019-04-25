import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import PlayerAttackEnemyMelee from './PlayerAttackEnemyMelee'

export default (player, enemy) => {
    // get active weapon from player, etc.
    let activeMeleeWeapon = player.getActiveMeleeWeapon();

    if (!activeMeleeWeapon) {
        activeMeleeWeapon = player.getUnarmedMeleeWeapon()
    }

    PlayerAttackEnemyMelee(activeMeleeWeapon, enemy);
}