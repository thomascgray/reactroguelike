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
import PF from 'pathfinding';
import HasPosition from '../Behaviours/HasPosition'
import { generate } from '../DungeonGenerator/DungeonGenerator'
import _ from 'lodash';
import PlayerEnemyCollision from '../Resolvers/PlayerEnemyCollision';

const dungeonMap = generate(20, 20);

window.player = new PlayerEntity()
window.camera = new CameraEntity()

window.enemies = [
    new EnemyEntity({ x: 0, y: 2}),
    new EnemyEntity({ x: 7, y: 11}),
]

const getCollidedEnemy = (enemies, playerPosition) => {
    let match = null;
    enemies.forEach(enemy => {
        if (enemy.getPosition().x === playerPosition.x && enemy.getPosition().y === playerPosition.y) {
            match = enemy;
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
            enemies: window.enemies.map(e => e.toState())
        }
    }

    componentDidMount () {
        document.addEventListener("keydown", e => {
            this.handleKeyDown(e);
        });
    }

    handleKeyDown(e) {
        e = e || window.event;
        const pos = new HasPosition(window.player.getPosition())

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
            default:
                break;
        }

        const collidedEnemy = getCollidedEnemy(window.enemies, pos.position)
        if (collidedEnemy) {
            PlayerEnemyCollision(window.enemies, window.player, collidedEnemy)



            this.setState({
                enemies: window.enemies.map(e => e.toState())
            })
        } else {
            window.player.setPosition(pos.position);
        }

        this.setState({
            player: window.player.toState()
        })
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <Camera {...this.state.camera.HasPixelPosition}>
                <Dungeon map={dungeonMap} />
                <Player {...this.state.player.HasPosition} />
                {this.state.enemies.map(e => {
                    return <Enemy key={e.id} {...e.HasPosition} />
                })}
            </Camera>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
