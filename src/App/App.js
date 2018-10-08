import React, { Component } from 'react';
import './App.css'
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

class App extends Component {
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
        let newDirection;

        switch (keyEvent.keyCode) {
            case keyMap.LEFT:
                pos.functions.moveLeft();
                newDirection = 'left';
                break;
            case keyMap.RIGHT:
                pos.functions.moveRight();
                newDirection = 'right';
                break;
            case keyMap.UP:
                pos.functions.moveUp();
                newDirection = 'up';
                break;
            case keyMap.DOWN:
                pos.functions.moveDown();
                newDirection = 'down';
                break;
            case keyMap.INVENTORY:
                const uiState = this.state.ui;
                uiState.inventory = !uiState.inventory;
                this.setState({ ui: uiState })
                break;
            default:
                break;
        }

        //todo was doing this to make animations work. it feels shit.
        // this.setState({
        //     isKeyPress: true
        // }, () => {
        //     setTimeout(() => {
        //         this.setState({
        //             isKeyPress: false
        //         })
        //     }, 300)
        // });

        if (dungeon.map[pos.position.x][pos.position.y] === 1 || dungeon.map[pos.position.x][pos.position.y] === 2) { // todo better way of knowing whats a wall
            // TODO IMRPOVE THIS
            // anything non 0 is a thing to hit
        } else {
            const collidedStageObject = window.stageObjects.find(obj => _.isEqual(obj.HasPosition.getPosition(), pos.position) && obj.IsCollidable.getIsCollidable());

            if (collidedStageObject) {
                PlayerStageObjectCollision()
            } else if (!collidedStageObject) {
                window.player.HasPosition.setPosition(pos.position);
                window.player.HasDirection.setDirection(newDirection);

                // todo this animation isnt good enough, means we need to regulate key inputs. think of something better
                // const el = document.getElementById('player');
                // el.classList.remove('bounce');
                // el.classList.add('bounce');
                // setTimeout(() => {
                //     el.classList.remove('bounce');
                // }, 300)
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
            <div className='app'>
                {this.state.ui.inventory && <Inventory player={window.player} items={this.state.player.HasInventory}/>}
                
                <DungeonRenderer dungeon={dungeon} />
                <PlayerRenderer player={this.state.player} />
                <StageObjectsRenderer stageObjects={this.state.stageObjects} />
            </div>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
