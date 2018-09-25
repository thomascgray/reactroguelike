import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import keyMap from '../keyMap'
import Dungeon from '../Dungeon/Dungeon'
import Player from '../Player/Player'
import Camera from '../Camera/Camera'
import Enemy from '../Enemy/Enemy'
import Log from '../Log/Log'
import PF from 'pathfinding';
import { generate } from '../DungeonGenerator/DungeonGenerator'

const dungeonMap = generate(100, 100);

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            camera: {
                position: {
                    x: 1,
                    y: 1
                },
            },
            player: {
                position: {
                    x: 15,
                    y: 10
                },
            },
        }
    }

    componentDidMount () {
        document.addEventListener("keydown", e => {
            this.handleKeyDown(e);
        });

        this.setState({
            grid: new PF.Grid(dungeonMap),
        })
    }

    handleKeyDown(e) {
        e = e || window.event;
        const player = this.state.player;
        const camera = this.state.camera;
        switch (e.keyCode) {
            case keyMap.LEFT:
                player.position.x -= 1;
                camera.position.x -= 1;
                break;
            case keyMap.RIGHT:
                player.position.x += 1;
                camera.position.x += 1;
                break;
            case keyMap.UP:
                player.position.y -= 1;
                camera.position.y -= 1;
                break;
            case keyMap.DOWN:
                player.position.y += 1;
                camera.position.y += 1;
                break;
            case keyMap.INTERACT:
                console.log('interating');
                if (this.state.playerPosition.x === this.state.dungeonProps.exit.x && this.state.playerPosition.y === this.state.dungeonProps.exit.y) {
                    console.log('you have exited the dungeon, well done')
                }
                break;
            case keyMap.SPACE:
                
                break;
            default:
                break;
        }

        this.setState({
            player,
            camera
        })
    }

    render() {
        return <div style={{ position: 'relative' }}>
            <Camera {...this.state.camera}>
                <Dungeon
                    map={dungeonMap}
                />
                <Player
                    {...this.state.player}
                />
                {/* {this.state.enemies.map(enemy => <Enemy key={`${enemy.id}`} {...enemy} />)} */}
            </Camera>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
