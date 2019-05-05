import React, { Component } from 'react';
import './Stage.css'
import DungeonRenderer from '../Dungeon/DungeonRenderer'
import PlayerRenderer from '../Player/PlayerRenderer'
import StageObjectsRenderer from '../StageObject/StageObjectsRenderer'
import InitialPlayerSetup from '../InitialPlayerSetup'
import { generate } from '../DungeonGenerator/Gerty'
import _ from 'lodash';
import PlayerStageDefault from '../InputHandling/PlayerStageDefault'

import Inventory from '../UI/Inventory'
import CharacterSheet from '../UI/CharacterSheet'
import Log from '../Log/Log'

import PowersPrepRenderer from '../Powers/PowersPrepRenderer'

import KeydownHandler from './KeydownHandler'

class Stage extends Component {
    dungeon;
    player;
    logMessages = [];

    constructor (props) {
        super(props);

        this.dungeon = generate({
            theme: 'crypt',
            floorCount: 1,
        });

        this.player = this.props.player;

        // this.state = {
        //     inputMode: 'playerStageDefault',
        //     logMessages: [],
        //     ui: {
        //         inventory: false,
        //         characterSheet: false
        //     },
        //     isPlayerPreppingPower: false,
        // }

        InitialPlayerSetup(this.player);
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
        
        console.log('player pos', this.player.HasPosition.getPosition());
        PlayerStageDefault(keyEvent, this.dungeon, this.player);
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
                    <CharacterSheet player={this.player} items={this.player.HasInventory}/>
                </div>
                <div className='log-wrapper'>
                    <Log messages={this.logMessages} />
                </div>
            </div>
            
            <div className='stage' id='stage'>
                {/* {this.state.ui.inventory && <Inventory player={this.player} closeInventory={() => this.closeInventory()}/>}
                
                <DungeonRenderer dungeon={this.dungeon} activeFloorIndex={0} />

                <StageObjectsRenderer stageObjects={this.dungeon.floors[this.dungeon.activeFloorIndex].stageObjects} />

                {this.state.isPlayerPreppingPower && <PowersPrepRenderer power={this.state.preppedPower} />} */}

                <PlayerRenderer player={this.player} />
            </div>
        </div>
    }
}

Stage.proptypes = {
    
}

export default Stage;
