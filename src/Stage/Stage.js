import React, { Component } from 'react';
import './Stage.css'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import PlayerRenderer from '../Player/PlayerRenderer'
import Player from '../Player/Player'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'
import InitialPlayerSetup from '../InitialPlayerSetup'
import { generate } from '../DungeonGenerator/Gerty'
import _ from 'lodash';

import Inventory from '../UI/Inventory'
import CharacterSheet from '../UI/CharacterSheet'
import Log from '../Log/Log'

import PowersPrepRenderer from '../Powers/PowersPrepRenderer'

import KeydownHandler from './KeydownHandler'

const dungeon = generate({
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
            inputMode: 'playerStageDefault',
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
        
        KeydownHandler(this, keyEvent, dungeon);

        this.setState({
            player: window.player.toState(),
            stageObjects: window.stageObjects.map(o => o.toState()),
        })
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
                    <CharacterSheet player={window.player} items={this.state.player.HasInventory}/>
                </div>
                <div className='log-wrapper'>
                    <Log messages={this.state.logMessages} />
                </div>
            </div>
            
            <div className='stage' id='stage'>
                {this.state.ui.inventory && <Inventory player={window.player} closeInventory={() => this.closeInventory()}/>}
                
                <DungeonRenderer dungeon={dungeon} />

                {this.state.isPlayerPreppingPower && <PowersPrepRenderer power={this.state.preppedPower} />}

                <PlayerRenderer player={this.state.player} />

                <StageObjectsRenderer stageObjects={this.state.stageObjects} />
            </div>
        </div>
    }
}

Stage.proptypes = {
    
}

export default Stage;
