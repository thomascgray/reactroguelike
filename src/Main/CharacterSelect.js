import React from 'react';
import './CharacterSelect.css';

const archetypes = [
    {
        name: 'Witch',
        image: require('../Assets/archetypes/td_monsters_witch_d1.png'),
        archetype: 'witch',
    },
    {
        name: 'Berserker',
        image: require('../Assets/archetypes/td_monsters_berserker_d1.png'),
        archetype: 'berserker',
    }
]

class CharacterSelect extends React.Component {
    render() {
        return (
            <div>
                {archetypes.map(a => <div className='class-card' key={a.name}>
                    <h3>{a.name}</h3>
                    <img src={a.image}></img>
                    <br />
                    <button onClick={() => this.props.onSelectArchetype(a.archetype)}>Select</button>
                </div>)}
            </div>
        )
    }
}

export default CharacterSelect