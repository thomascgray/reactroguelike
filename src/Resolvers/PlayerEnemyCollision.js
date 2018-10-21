import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import PlayerAttackEnemyMelee from './PlayerAttackEnemyMelee'

export default (player, enemy) => {
    // get active weapon from player, etc.
    let activeMeleeWeapon = player.getActiveMeleeWeapon();

    if (!activeMeleeWeapon) {
        activeMeleeWeapon = { // todo get this from somewhere
            name: 'fists',
            damage: '1d2',
            damageType: 'unarmed',
        }
    }

    PlayerAttackEnemyMelee(activeMeleeWeapon, enemy);
}