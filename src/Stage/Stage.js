import React, { Component } from 'react';
import './Stage.css'
import keyMap from '../keyMap'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import PlayerRenderer from '../Player/PlayerRenderer'
import Player from '../Player/Player'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'
import { LogMessage } from '../Log/LogActions'

import PlayerStageObjectCollision from '../Resolvers/PlayerStageObjectCollision'
import PF from 'pathfinding';
import HasPosition from '../Behaviours/HasPosition'
import { generate } from '../DungeonGenerator/Gerty'
import _ from 'lodash';

import Inventory from '../UI/Inventory'

import Log from '../Log/Log'

const dungeon = generate({
    sectionWidth: 7,
    sectionHeight: 7,
    theme: 'crypt',
    doors: {
        north: true,
        west: true,
    },
    doorPlacement: 'random',
});

window.player = new Player({
    x: 4,
    y: 5
})

window.stageObjects = dungeon.stageObjects;

class Stage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isKeyPress: false,
            player: window.player.toState(),
            stageObjects: window.stageObjects.map(o => o.toState()),
            logMessages: [],
            ui: {
                inventory: false
            }
        }
    }

    componentDidMount () {
        document.addEventListener("keydown", e => {
            this.handleKeyDown(e);
        });

        document.addEventListener("log-action", e => {
            const logMessages = this.state.logMessages;
            logMessages.unshift(e.detail);
            this.setState({
                logMessages
            })
        });
    }

    handleKeyDown(keyEvent) {
        if (this.state.isKeyPress) {
            return false;
        }
        keyEvent = keyEvent || window.event;
        
        const pos = new HasPosition(window.player.HasPosition.getPosition())
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
                const uiState = this.state.ui;
                uiState.inventory = !uiState.inventory;
                this.setState({ ui: uiState })
                break;
            default:
                break;
        }

        window.player.HasDirection.setDirection(newDirection);

        if (dungeon.map[pos.position.x][pos.position.y] === 1 || dungeon.map[pos.position.x][pos.position.y] === 2) { // todo better way of knowing whats a wall
            // TODO IMRPOVE THIS
            // anything non 0 is a thing to hit
        } else {
            const hitStageObject = window.stageObjects.find(obj => _.isEqual(obj.HasPosition.getPosition(), pos.position));
        
            if (hitStageObject) {
                PlayerStageObjectCollision()
            }

            // if theres no stage object, OR
            // there is, but its collidable is false
            // we can move there
            if (!hitStageObject || (hitStageObject && hitStageObject.IsCollidable.getIsCollidable() === false)) {
                window.player.HasPosition.setPosition(pos.position);
            }
        }

        this.setState({
            player: window.player.toState()
        });
    }

    render() {
        return <div>
            <div className='log-wrapper'>
                <Log messages={this.state.logMessages} />
            </div>
            <div className='stage'>
                {this.state.ui.inventory && <Inventory player={window.player} items={this.state.player.HasInventory}/>}
                
                <DungeonRenderer dungeon={dungeon} />
                <PlayerRenderer player={this.state.player} />
                <StageObjectsRenderer stageObjects={this.state.stageObjects} />
            </div>
        </div>
    }
}

Stage.proptypes = {
    
}

export default Stage;
