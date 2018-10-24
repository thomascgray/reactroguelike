import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import EnemyDeath from './EnemyDeath'
import Dice from '../Dice'
import Grammar from '../Utils/Grammar'

export default (weapon, enemy) => {
    const damageDone = Dice(weapon.damage)

    enemy.HasHp.removeHp(damageDone);

    LogMessage(`you ${Grammar.getRandomVerbForDamageType(weapon.damageType)} the ${enemy.HasArchetype.getArchetype()} for ${damageDone} damage with your ${weapon.name}`)

    if (enemy.HasHp.getHp() <= 0) {
        EnemyDeath(enemy);
        LogMessage(`the ${enemy.HasArchetype.getArchetype()} dies!`)
    }
}