import { LogMessage } from '../Log/LogActions'
import PlayerEnemyCollision from './PlayerEnemyCollision'

export default (player, stageObject) => {
    if (stageObject.constructor.name === 'Enemy') {
        return PlayerEnemyCollision(player, stageObject)
    }

    LogMessage(`you hit something!`)
}
