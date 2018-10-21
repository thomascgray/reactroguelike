import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import EnemyDeath from './EnemyDeath'
import Dice from '../Dice'

export default (weapon, enemy) => {
    const damageDone = Dice(weapon.damage)

    enemy.HasHp.removeHp(damageDone);

    LogMessage(`you hurt the ${enemy.HasArchetype.getArchetype()} for ${damageDone} with your ${weapon.name}`)

    if (enemy.HasHp.getHp() <= 0) {
        EnemyDeath(enemy);
    }
}