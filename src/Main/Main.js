import React from 'react';
import CharacterSelect from './CharacterSelect'
import Stage from '../Stage/Stage'

class Main extends React.Component {
    constructor (props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        let isDebug = urlParams.get('debug');
        
        this.state = {
            playerArchetype: '', 
            isInCharacterSelect: isDebug ? true : false,
            isInStage: false,
        }
    }

    startNewGame () {
        this.setState({
            isInCharacterSelect: true
        })
    }

    onSelectArchetype (archetype) {
        console.log('selected', archetype);
        this.setState({
            isInStage: true,
            playerArchetype: archetype,
        })
    }

    render() {
        return (
            <div>
                {this.state.isInStage && <Stage playerArchetype={this.state.playerArchetype} />}

                {!this.state.isInStage && 
                    <div>
                        <h1>The Real Treasure Was The Bullshit We Did Along The Way</h1>
        
                        <hr />
        
                        <button onClick={() => this.startNewGame()}>New Game</button>
        
                        {this.state.isInCharacterSelect && <CharacterSelect onSelectArchetype={archetype => this.onSelectArchetype(archetype)}/>}

                    </div>
                }
            </div>
        )
    }
}

export default Main