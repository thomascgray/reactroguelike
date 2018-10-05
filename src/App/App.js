import React, { Component } from 'react';
import './App.css'
import keyMap from '../keyMap'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import PlayerRenderer from '../Player/PlayerRenderer'
import Player from '../Player/Player'
import EnemyRenderer from '../Enemy/EnemyRenderer'
import Enemy from '../Enemy/Enemy'
import CameraRenderer from '../Camera/CameraRenderer'
import Camera from '../Camera/Camera'

import LootRenderer from '../Loot/LootRenderer'
import Loot from '../Loot/Loot'

import PF from 'pathfinding';
import HasPosition from '../Behaviours/HasPosition'
// import { generate } from '../DungeonGenerator/DungeonGenerator'
import { generate } from '../DungeonGenerator/Gerty'
import _ from 'lodash';
import PlayerEnemyCollision from '../Resolvers/PlayerEnemyCollision';
import PlayerLootCollision from '../Resolvers/PlayerLootCollision';
// import PlayerNonZeroTileCollision from '../Resolvers/PlayerNonZeroTileCollision';
import Uuid from 'uuid/v4'
import Inventory from '../UI/Inventory'

import Log from '../Log/Log'

const dungeon = generate({
    sectionWidth: 7,
    sectionHeight: 7,
    theme: 'crypt'
});

window.player = new Player({
    x: 4,
    y: 5
})

window.camera = new Camera()

window.enemies = []

window.loots = []

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // camera: window.camera.toState(),
            player: window.player.toState(),
            enemies: window.enemies.map(e => e.toState()),
            loots: window.loots.map(l => l.toState()),
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

    handleKeyDown(e) {
        e = e || window.event;
        console.log('e.keyCode', e.keyCode);
        const pos = new HasPosition(window.player.HasPosition.getPosition())

        switch (e.keyCode) {
            case keyMap.LEFT:
                pos.functions.moveLeft();
                break;
            case keyMap.RIGHT:
                pos.functions.moveRight();
                break;
            case keyMap.UP:
                pos.functions.moveUp();
                break;
            case keyMap.DOWN:
                pos.functions.moveDown();
                break;
            case keyMap.INVENTORY:
                const uiState = this.state.ui;
                uiState.inventory = !uiState.inventory;
                this.setState({ ui: uiState })
                break;
            default:
                break;
        }

        // TODO
        /**
         * should be a list of "world objects"
         * each has or hasnt a "collidable" behaviour
         * 
         * new behaviours should be like "is enemy", can work with like "is inventory"?
         * 
         * // get world object(s) you hit - can you collide with more than 1 thing at once?
         * can world objects be stacked?
         * 
         * hitThings = worldObjects.find(wo => (wo.HasPosition && wo.HasPosition.position === player.pos)) // some wo might not have a position? i mean they absolutely should though, they're in the fucking world
         * 
         * ...THEN
         * hitThings.forEach(wo => {
         *  wo.IsEnemy && wo.isEnemy.isStillAlive
         *    hit the enemy
         *  wo.isLoot
         *    loot the objects
         *  wo.isItem
         *    loot the object
         * })
         * 
         * fit collidable in ^ here somewhere? you should be able to "interact" with wo without them being collidable e.g walking over an item
         * 
         * 
         */

        if (dungeon.map[pos.position.x][pos.position.y] > 0) {
            // TODO IMRPOVE THIS
            // anything non 0 is a thing to hit
        } else {
            window.player.HasPosition.setPosition(pos.position);
        }





        this.setState({
            player: window.player.toState()
        })
    }

    render() {
        return <div>
            <div className='log-wrapper'>
                <Log messages={this.state.logMessages} />
            </div>
            <div className='app'>
                {this.state.ui.inventory && <Inventory player={window.player} items={this.state.player.HasInventory}/>}
                
                <DungeonRenderer dungeon={dungeon} />
                <PlayerRenderer {...this.state.player.HasPosition} />
                {this.state.enemies.map(e => {
                    return <EnemyRenderer key={e.id} {...e.HasPosition} />
                })}
                {this.state.loots.map(l => {
                    return <LootRenderer key={l.id} {...l.HasPosition} />
                })}
                
            </div>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
