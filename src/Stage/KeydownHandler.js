import PlayerStageDefault from '../InputHandling/PlayerStageDefault'
import PlayerStagePreppingPowerAreaOfEffect from '../InputHandling/PlayerStagePreppingPowerAreaOfEffect'


export default (stageContext, keyEvent, dungeon) => {
    const preppedPower = stageContext.state.preppedPower;

    if (stageContext.state.inputMode === 'playerStageDefault') {
        PlayerStageDefault(keyEvent, stageContext, dungeon);
    } else if (preppedPower && stageContext.state.inputMode === `power-${preppedPower.type}`) {
        PlayerStagePreppingPowerAreaOfEffect(keyEvent, stageContext, dungeon);
    }
}