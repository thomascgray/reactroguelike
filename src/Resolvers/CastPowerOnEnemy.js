import _ from 'lodash';
import Dice from '../Dice'
import EnemyDeath from './EnemyDeath'
import { LogMessage } from '../Log/LogActions'

export default function (enemy, power) {
    const damageDone = Dice(power.damage)

    enemy.HasHp.removeHp(damageDone);

    LogMessage(`you hurt the ${enemy.HasArchetype.getArchetype()} for ${damageDone} with your power: ${power.name}`)
    
    if (enemy.HasHp.getHp() <= 0) {
        EnemyDeath(enemy);
    }
}