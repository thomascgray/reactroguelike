import _ from 'lodash'
import { LogMessage } from '../Log/LogActions'
import PlayerEnemyCollision from './PlayerEnemyCollision'
export default (player, stageObject) => {
    if (stageObject.constructor.name === 'EnemyEntity') {
        return PlayerEnemyCollision(player, stageObject)
    }

    LogMessage(`you hit something!`)


    // get active weapon from player, etc.
    // const activeMeleeWeapon = player.getActiveMeleeWeapon();
    // let damageDone = activeMeleeWeapon ? activeMeleeWeapon.damage : 1;

    // enemy.HasHp.removeHp(damageDone);
    

    // if (enemy.HasHp.getHp() <= 0) {
    //     _.remove(enemies, e => e.HasId.getId() === enemy.HasId.getId());
    //     LogMessage(`you killed the enemy!`)
    // }
}
