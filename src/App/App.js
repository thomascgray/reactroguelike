import React, { Component } from 'react';
import './App.css'
import keyMap from '../keyMap'
import Dungeon from '../Dungeon/Dungeon'
import Player from '../Player/Player'
import PlayerEntity from '../Player/PlayerEntity'
import Enemy from '../Enemy/Enemy'
import EnemyEntity from '../Enemy/EnemyEntity'
import Camera from '../Camera/Camera'
import CameraEntity from '../Camera/CameraEntity'

import Loot from '../Loot/Loot'
import LootEntity from '../Loot/LootEntity'

import PF from 'pathfinding';
import HasPosition from '../Behaviours/HasPosition'
import { generate } from '../DungeonGenerator/DungeonGenerator'
import _ from 'lodash';
import PlayerEnemyCollision from '../Resolvers/PlayerEnemyCollision';
import PlayerLootCollision from '../Resolvers/PlayerLootCollision';
import Uuid from 'uuid/v4'
import Inventory from '../UI/Inventory'

import Log from '../Log/Log'

const dungeonMap = generate(20, 20);

window.player = new PlayerEntity()
window.camera = new CameraEntity()

window.enemies = [
    new EnemyEntity({ x: 0, y: 2}),
    new EnemyEntity({ x: 7, y: 11}),
]

window.loots = [
    new LootEntity({ x: 4, y: 0 }, [
        {
            id: Uuid(),
            name: 'sword',
            type: 'melee',
            damage: 4
        }
    ]),
    new LootEntity({ x: 11, y: 7 }, [
        {
            id: Uuid(),
            name: 'axe',
            type: 'melee',
            damage: 7
        }
    ]),
    new LootEntity({ x: 9, y: 18 }, [
        {
            id: Uuid(),
            name: 'dagger',
            type: 'melee',
            damage: 2
        }
    ])
]

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

        // replace this whole section with some kind of thing where
        // the individual items register themselves as "colliable"
        const collidedEnemy = getCollidedPositionableItem(window.enemies, pos.position)
        const collidedLoot = getCollidedPositionableItem(window.loots, pos.position)
        if (collidedEnemy) {
            PlayerEnemyCollision(window.enemies, window.player, collidedEnemy)
            this.setState({
                enemies: window.enemies.map(e => e.toState())
            })
        } else if (collidedLoot) {
            PlayerLootCollision(window.loots, window.player, collidedLoot)
            this.setState({
                loots: window.loots.map(e => e.toState())
            })
        } else {
            window.player.HasPosition.setPosition(pos.position);
        }

        this.setState({
            player: window.player.toState()
        })
    }

    render() {
        return <div>
            <div className='dungeon' style={{ position: 'absolute' }}>
                {this.state.ui.inventory && <Inventory player={window.player} items={this.state.player.HasInventory}/>}
                <Camera {...this.state.camera.HasPixelPosition}>
                    <Dungeon map={dungeonMap} />
                    <Player {...this.state.player.HasPosition} />
                    {this.state.enemies.map(e => {
                        return <Enemy key={e.id} {...e.HasPosition} />
                    })}
                    {this.state.loots.map(l => {
                        return <Loot key={l.id} {...l.HasPosition} />
                    })}
                </Camera>
            </div>
            <div className='log' style={{ position: 'absolute', top: 600 }}>
                <Log messages={this.state.logMessages} />
            </div>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
