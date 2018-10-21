import React, { Component } from 'react';
import './Stage.css'
import keyMap from '../keyMap'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import PlayerRenderer from '../Player/PlayerRenderer'
import Player from '../Player/Player'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'
import { LogMessage } from '../Log/LogActions'
import InitialPlayerSetup from '../InitialPlayerSetup'
import PlayerStageObjectCollision from '../Resolvers/PlayerStageObjectCollision'
import PF from 'pathfinding';
import HasPosition from '../Behaviours/HasPosition'
import { generate } from '../DungeonGenerator/Gerty'
import _ from 'lodash';

import Inventory from '../UI/Inventory'
import CharacterSheet from '../UI/CharacterSheet'

import Log from '../Log/Log'

const dungeon = generate({
    sectionWidth: 7,
    sectionHeight:7,
    theme: 'crypt',
});

window.stageObjects = dungeon.stageObjects;

class Stage extends Component {
    constructor (props) {
        super(props);
        
        window.player = new Player({
            position: {
                x: 4,
                y: 5
            },
            archetype: this.props.playerArchetype
        });

        this.state = {
            player: window.player.toState(),
            stageObjects: window.stageObjects.map(o => o.toState()),
            logMessages: [],
            ui: {
                inventory: false,
                characterSheet: false
            },
            isPlayerPreppingPower: false,
        }

        InitialPlayerSetup(window.player);
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
        keyEvent = keyEvent || window.event;
        

        if (this.state.isPlayerPreppingPower) {

            if (keyEvent.keyCode === keyMap.ESCAPE) {
                this.setState({
                    isPlayerPreppingPower: false,
                });
            }
            return;
        }



        const pos = new HasPosition(window.player.HasPosition.getPosition())
        const uiState = this.state.ui;
        let hasMoved = false;
        let newDirection;

        console.log('keyEvent.keyCode', keyEvent.keyCode);

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
                this.setState({ ui: uiState })
                break;
            case keyMap.NUMBER_ONE:
                this.setState({
                    isPlayerPreppingPower: true,
                })
                break;
            default:
                break;
        }

        if (hasMoved) {
            window.player.HasDirection.setDirection(newDirection);
        }

        if (dungeon.map[pos.position.x][pos.position.y] === 1 || dungeon.map[pos.position.x][pos.position.y] === 2) { // todo better way of knowing whats a wall
            // TODO IMRPOVE THIS
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

        this.setState({
            player: window.player.toState(),
            stageObjects: window.stageObjects.map(o => o.toState()),
        });
    }

    closeInventory () {
        const uiState = this.state.ui;
        uiState.inventory = false;
        this.setState({ ui: uiState })
    }

    render() {
        return <div>
            <div className='ui-panel'>
                <div className='character-sheet'>
                    <p>{window.player.HasArchetype.getArchetype()}</p>
                    <CharacterSheet player={window.player} items={this.state.player.HasInventory}/>
                </div>
                <div className='log-wrapper'>
                    <Log messages={this.state.logMessages} />
                </div>
            </div>
            
            <div className='stage' id='stage'>
                {this.state.ui.inventory && <Inventory player={window.player} items={this.state.player.HasInventory} closeInventory = {() => this.closeInventory()}/>}
                
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
