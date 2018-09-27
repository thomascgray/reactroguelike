import _ from 'lodash'

export default (enemies, player, enemy) => {
    // get active weapon from player, etc.

    console.log('enemy', enemy);
    enemy.removeHp(1);

    if (enemy.getHp() <= 0) {
        _.remove(enemies, e => e.id === enemy.id);
    }
}