import HasPosition from '../Behaviours/HasPosition'
import keyMap from '../keyMap'
import _ from 'lodash'
import PlayerStageObjectCollision from '../Resolvers/PlayerStageObjectCollision'
import { preparePower } from '../Utils/Powers'

export default function (keyEvent, dungeon, player) {
    console.log('player', player);
    const pos = new HasPosition(player.HasPosition.getPosition())
    // const uiState = stageContext.state.ui;
    let hasMoved = false;
    let newDirection;
    let power

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
            // uiState.inventory = !uiState.inventory;
            break;
        case keyMap.NUMBER_ONE:
            power = player.HasPowers.getPowers()[0];
            if (power) {
                // stageContext.setState({
                //     inputMode: `power-${power.type}`,
                //     isPlayerPreppingPower: true,
                //     spellSlotPrepped: 1,
                //     preppedPower: preparePower(power)
                // })
            }
            break;
        case keyMap.NUMBER_TWO:
            power = player.HasPowers.getPowers()[1];
            if (power) {
                // stageContext.setState({
                //     inputMode: `power-${power.type}`,
                //     isPlayerPreppingPower: true,
                //     spellSlotPrepped: 1,
                //     preppedPower: preparePower(power)
                // })
            }
            break;
        default:
            break;
    }

    const floor = dungeon.getActiveFloor();

    if (hasMoved) {
        player.HasDirection.setDirection(newDirection);
    }

    if (floor.map[pos.position.x][pos.position.y] === 1 || floor.map[pos.position.x][pos.position.y] === 2) { // todo better way of knowing whats a wall
        // TODO IMRPOVE
        // anything non 0 is a thing to hit
    } else {
        const hitStageObject = floor.stageObjects.find(obj => _.isEqual(obj.HasPosition.getPosition(), pos.position));
    
        if (hitStageObject) {
            PlayerStageObjectCollision(player, hitStageObject)
        }

        // if theres no stage object, OR
        // there is, but its collidable is false
        // we can move there
        if (!hitStageObject || (hitStageObject && hitStageObject.IsCollidable.getIsCollidable() === false)) {
            player.HasPosition.setPosition(pos.position);
        }
    }

    // stageContext.setState({
    //     player: player.toState(),
    //     // stageObjects: window.stageObjects.map(o => o.toState()),
    // });
}