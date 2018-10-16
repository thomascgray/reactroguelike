import React from 'react';
import './CharacterSelect.css';

const archetypes = [
    {
        name: 'Witch',
        image: require('../Assets/archetypes/td_monsters_witch_d1.png'),
        archetype: 'witch',
    },
    {
        name: 'Fighter',
        image: require('../Assets/archetypes/td_monsters_fighter_d1.png'),
        archetype: 'fighter',
    },
    {
        name: 'Cleric',
        image: require('../Assets/archetypes/td_monsters_cleric_d1.png'),
        archetype: 'cleric',
    },
    {
        name: 'Berserker',
        image: require('../Assets/archetypes/td_monsters_berserker_d1.png'),
        archetype: 'berserker',
    },
    {
        name: 'Druid',
        image: require('../Assets/archetypes/td_monsters_druid_d1.png'),
        archetype: 'druid',
    },
    {
        name: 'Rogue',
        image: require('../Assets/archetypes/td_monsters_hobbit_d1.png'),
        archetype: 'hobbit',
    },
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