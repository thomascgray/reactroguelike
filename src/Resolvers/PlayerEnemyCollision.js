import _ from 'lodash'

export default (enemies, player, enemy) => {
    // get active weapon from player, etc.
    const activeMeleeWeapon = player.getActiveMeleeWeapon();
    let damageDone = activeMeleeWeapon ? activeMeleeWeapon.damage : 1;

    enemy.removeHp(damageDone);

    if (enemy.getHp() <= 0) {
        _.remove(enemies, e => e.id === enemy.id);
    }
}