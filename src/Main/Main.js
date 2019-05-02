import React from 'react';
import CharacterSelect from './CharacterSelect'
import Stage from '../Stage/Stage'
import Player from '../Player/Player'

class Main extends React.Component {
    player;
    constructor (props) {
        super(props);
        this.state = {
            playerArchetype: '', 
            isInStage: false,
        }
    }

    onSelectArchetype (archetype) {
        this.setState({
            isInStage: true,
        })

        this.player = new Player({
            position: {
                x: 4,
                y: 5
            },
            archetype
        });
    }

    render() {
        return (
            <div>
                {this.state.isInStage && <Stage
                    player={this.player}
                />}

                {!this.state.isInStage && 
                    <div>
                        <h1>reactroguelike thing</h1>
        
                        <hr />
        
                        <CharacterSelect
                            onSelectArchetype={archetype => this.onSelectArchetype(archetype)}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default Main