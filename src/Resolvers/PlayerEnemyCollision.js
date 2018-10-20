import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import EnemyDeath from './EnemyDeath'

export default (player, enemy) => {
    // get active weapon from player, etc.
    let activeMeleeWeapon = player.getActiveMeleeWeapon();

    if (!activeMeleeWeapon) {
        activeMeleeWeapon = { // todo get this from somewhere
            name: 'fists',
            damage: 1
        }
    }

    let damageDone = activeMeleeWeapon.damage // todo this will eventually be a dice expression parser

    enemy.HasHp.removeHp(damageDone);
    LogMessage(`you hurt the enemy for ${damageDone} with your ${activeMeleeWeapon.name}`)

    console.log('enemy.HasHp.getHp()', enemy.HasHp.getHp());

    if (enemy.HasHp.getHp() <= 0) {
        // enemy has died
        EnemyDeath(enemy);
    }
}