import React from 'react';
import CharacterSelect from './CharacterSelect'
import Stage from '../Stage/Stage'

class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isInCharacterSelect: false,
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
            isInStage: true
        })
    }

    render() {
        return (
            <div>
                {this.state.isInStage && <Stage />}
                <h1>The Real Treasure Was The Bullshit We Did Along The Way</h1>

                <hr />

                <button onClick={() => this.startNewGame()}>New Game</button>

                {this.state.isInCharacterSelect && <CharacterSelect onSelectArchetype={archetype => this.onSelectArchetype(archetype)}/>}
            </div>
        )
    }
}

export default Main