import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import keyMap from '../keyMap'
import Dungeon from '../Dungeon/Dungeon'
import Player from '../Player/Player'
import Enemy from '../Enemy/Enemy'
import Log from '../Log/Log'
import PF from 'pathfinding';
import { generate } from '../DungeonGenerator/DungeonGenerator'

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            player: {
                position: {
                    x: 5,
                    y: 9
                },
            },
            dungeonMap: generate(20, 20),
            enemies: [
                {
                    id: 1,
                    position: {
                        x: 19,
                        y: 11
                    },
                },
                {
                    id: 2,
                    position: {
                        x: 6,
                        y: 5
                    },
                }
            ]
        }
    }

    componentDidMount () {
        document.addEventListener("keydown", e => {
            this.handleKeyDown(e);
        });

        this.setState({
            grid: new PF.Grid(this.state.dungeonMap),
        })
    }

    handleKeyDown(e) {
        e = e || window.event;
        console.log('e.keyCode', e.keyCode);
        const player = this.state.player;

        switch (e.keyCode) {
            case keyMap.LEFT:
                player.position.x -= 1;
                this.runEnemyActions();
                break;
            case keyMap.RIGHT:
                player.position.x += 1;
                this.runEnemyActions();
                break;
            case keyMap.UP:
                player.position.y -= 1;
                this.runEnemyActions();
                break;
            case keyMap.DOWN:
                player.position.y += 1;
                this.runEnemyActions();
                break;
            case keyMap.INTERACT:
                console.log('interating');
                if (this.state.playerPosition.x === this.state.dungeonProps.exit.x && this.state.playerPosition.y === this.state.dungeonProps.exit.y) {
                    console.log('you have exited the dungeon, well done')
                }
                break;
            case keyMap.SPACE:
                this.runEnemyActions();
                break;
            default:
                break;
        }

        this.setState({ player })
    }

    buildPathfindingGridFromDungeonMap () {

    }

    runEnemyActions () {
        const grid = this.state.grid.clone();
        const finder = new PF.AStarFinder();

        const enemies = this.state.enemies;
        enemies.map(enemy => {
            const path = finder.findPath(enemy.position.x, enemy.position.y, this.state.player.position.x, this.state.player.position.y, this.state.grid.clone());
            enemy.position.x = path[1][0];
            enemy.position.y = path[1][1];
            return enemy;
        })

        this.setState({
            enemies,
        })
    }

    render() {
        return <div style={{ position: "relative" }}>
            <div className='app'>
                <Dungeon
                    map={this.state.dungeonMap}
                    exit={{
                        x: 3, y: 5
                    }}
                />
                <Player
                    {...this.state.player}
                />
                {this.state.enemies.map(enemy => <Enemy key={`${enemy.id}`} {...enemy} />)}
            </div>
            <div className='log'>
                {/* <Log messages={[
                    "this is a message",
                    "this is another message"
                ]}/> */}
            </div>
        </div>
    }
}

App.proptypes = {
    
}

export default App;
