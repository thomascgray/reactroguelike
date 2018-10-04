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
    sectionWidth: 10,
    sectionHeight: 10,
    theme: 'crypt'
});

window.player = new Player({
    x: 4,
    y: 5
})

window.camera = new Camera()

window.enemies = []

window.loots = []

const getCollidedPositionableItem = (positionableItems, playerPosition) => {
    let match = null;
    positionableItems.forEach(item => {
        if (item.HasPosition.getPosition().x === playerPosition.x && item.HasPosition.getPosition().y === playerPosition.y) {
            match = item;
        }

        if (match) {
            return match;
        }
    });
    return match;
}

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            camera: window.camera.toState(),
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

        // console.log('pos.position.x', pos.position.x);
        // console.log('pos.position.y', pos.position.y);

        // replace this whole section with some kind of thing where
        // the individual items register themselves as "collideble"
        // const collidedEnemy = getCollidedPositionableItem(window.enemies, pos.position)
        // const collidedLoot = getCollidedPositionableItem(window.loots, pos.position)
        // if (collidedEnemy) {
        //     PlayerEnemyCollision(window.enemies, window.player, collidedEnemy)
        //     this.setState({
        //         enemies: window.enemies.map(e => e.toState())
        //     })
        // } else if (collidedLoot) {
        //     PlayerLootCollision(window.loots, window.player, collidedLoot)
        //     this.setState({
        //         loots: window.loots.map(e => e.toState())
        //     })
        // } else if (dungeon.map[pos.position.x][pos.position.y] === 1) {
        //     // TODO IMRPOVE THIS
        //     // its a wall
        // } else {
        //     window.player.HasPosition.setPosition(pos.position);
        // }

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
                <CameraRenderer {...this.state.camera.HasPixelPosition}>
                    <DungeonRenderer dungeon={dungeon} />
                    <PlayerRenderer {...this.state.player.HasPosition} />
                    {this.state.enemies.map(e => {
                        return <EnemyRenderer key={e.id} {...e.HasPosition} />
                    })}
                    {this.state.loots.map(l => {
                        return <LootRenderer key={l.id} {...l.HasPosition} />
                    })}
                </CameraRenderer>
            </div>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
