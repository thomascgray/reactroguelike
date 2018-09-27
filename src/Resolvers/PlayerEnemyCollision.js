import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'

export default (enemies, player, enemy) => {
    // get active weapon from player, etc.
    const activeMeleeWeapon = player.getActiveMeleeWeapon();
    let damageDone = activeMeleeWeapon ? activeMeleeWeapon.damage : 1;

    enemy.removeHp(damageDone);
    LogMessage(`you hurt the enemy for ${damageDone}`)

    if (enemy.getHp() <= 0) {
        _.remove(enemies, e => e.id === enemy.id);
        LogMessage(`you killed the enemy!`)
    }
}