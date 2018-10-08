import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'

export default (enemies, player, enemy) => {
    // get active weapon from player, etc.
    const activeMeleeWeapon = player.getActiveMeleeWeapon();
    let damageDone = activeMeleeWeapon ? activeMeleeWeapon.damage : 1;

    enemy.HasHp.removeHp(damageDone);
    LogMessage(`you hurt the enemy for ${damageDone} with ${activeMeleeWeapon.name}`)

    if (enemy.HasHp.getHp() <= 0) {
        _.remove(enemies, e => e.HasId.getId() === enemy.HasId.getId());
        LogMessage(`you killed the enemy!`)
    }
}