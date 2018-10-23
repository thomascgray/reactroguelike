import CastPower from '../Resolvers/CastPower'
import keyMap from '../keyMap'
import _ from 'lodash'

export default function (keyEvent, stageContext, dungeon) {
    switch (keyEvent.keyCode) {
        case keyMap.NUMBER_ONE:
            if (stageContext.state.spellSlotPrepped === 1) {
                stageContext.setState({
                    inputMode: 'playerStageDefault',
                    isPlayerPreppingPower: false,
                    spellSlotPrepped: null,
                    preppedPower: null
                })
            }
            break;
        case keyMap.SPACE:
            CastPower(stageContext.state.preppedPower);
            stageContext.setState({
                inputMode: 'playerStageDefault',
                isPlayerPreppingPower: false,
                preppedPower: null,
            })
            break;
        default:
            break;
    }

    if (_.includes(keyMap.MOVEMENTKEYS, keyEvent.keyCode)) {
        stageContext.setState({
            inputMode: 'playerStageDefault',
            isPlayerPreppingPower: false,
            preppedPower: null,
        })
    }
}