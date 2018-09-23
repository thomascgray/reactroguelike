import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css'
import keyMap from '../keyMap'
import Dungeon from '../Dungeon/Dungeon'
import Player from '../Player/Player'
import Log from '../Log/Log'

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            playerPosition: {
                x: 5,
                y: 9
            }
        }
    }

    componentDidMount () {
        document.addEventListener("keydown", e => {
            this.handleKeyDown(e);
        });
    }

    handleKeyDown(e) {
        e = e || window.event;
        console.log('e.keyCode', e.keyCode);
        switch (e.keyCode) {
            case keyMap.LEFT:
                this.setState({ playerPosition: {...this.state.playerPosition, x: this.state.playerPosition.x - 1 }});
                break;
            case keyMap.RIGHT:
                this.setState({ playerPosition: {...this.state.playerPosition, x: this.state.playerPosition.x + 1 }});
                break;
            case keyMap.UP:
                this.setState({ playerPosition: {...this.state.playerPosition, y: this.state.playerPosition.y - 1 }});
                break;
            case keyMap.DOWN:
                this.setState({ playerPosition: {...this.state.playerPosition, y: this.state.playerPosition.y + 1 }});
                break;
            default:
                break;  
        }
    }

    render() {
        return <div style={{ position: "relative" }}>
            <div className='app'>
                <Dungeon width={20} height={20} />
                <Player position={this.state.playerPosition} />
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
