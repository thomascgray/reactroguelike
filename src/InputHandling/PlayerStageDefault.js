import HasPosition from '../Behaviours/HasPosition'
import keyMap from '../keyMap'
import _ from 'lodash'
import PlayerStageObjectCollision from '../Resolvers/PlayerStageObjectCollision'
import { preparePower } from '../Utils/Powers'

export default function (keyEvent, stageContext, dungeon) {
    const pos = new HasPosition(window.player.HasPosition.getPosition())
    const uiState = stageContext.state.ui;
    let hasMoved = false;
    let newDirection;

    switch (keyEvent.keyCode) {
        case keyMap.LEFT:
            pos.functions.moveLeft();
            newDirection = 'left';
            hasMoved = true;
            break;
        case keyMap.RIGHT:
            pos.functions.moveRight();
            newDirection = 'right';
            hasMoved = true;
            break;
        case keyMap.UP:
            pos.functions.moveUp();
            newDirection = 'up';
            hasMoved = true;
            break;
        case keyMap.DOWN:
            pos.functions.moveDown();
            newDirection = 'down';
            hasMoved = true;
            break;
        case keyMap.INVENTORY:
            uiState.inventory = !uiState.inventory;
            stageContext.setState({ ui: uiState })
            break;
        case keyMap.NUMBER_ONE:
            stageContext.setState({
                inputMode: 'playerStagePreppingPower',
                isPlayerPreppingPower: true,
                spellSlotPrepped: 1,
                preppedPower: preparePower(window.player.HasPowers.getPowers()[0])
            })
            break;
        default:
            break;
    }

    if (hasMoved) {
        window.player.HasDirection.setDirection(newDirection);
    }

    if (dungeon.map[pos.position.x][pos.position.y] === 1 || dungeon.map[pos.position.x][pos.position.y] === 2) { // todo better way of knowing whats a wall
        // TODO IMRPOVE
        // anything non 0 is a thing to hit
    } else {
        const hitStageObject = window.stageObjects.find(obj => _.isEqual(obj.HasPosition.getPosition(), pos.position));
    
        if (hitStageObject) {
            PlayerStageObjectCollision(window.player, hitStageObject)
        }

        // if theres no stage object, OR
        // there is, but its collidable is false
        // we can move there
        if (!hitStageObject || (hitStageObject && hitStageObject.IsCollidable.getIsCollidable() === false)) {
            window.player.HasPosition.setPosition(pos.position);
        }
    }

    stageContext.setState({
        player: window.player.toState(),
        stageObjects: window.stageObjects.map(o => o.toState()),
    });
}