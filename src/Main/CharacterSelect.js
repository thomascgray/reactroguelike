import React from 'react';
import './CharacterSelect.css';

const archetypes = [
    {
        name: 'Witch',
        image: require('../Assets/archetypes/td_monsters_witch_d1.png'),
    },
    {
        name: 'Fighter',
        image: require('../Assets/archetypes/td_monsters_fighter_d1.png'),
    },
    {
        name: 'Cleric',
        image: require('../Assets/archetypes/td_monsters_cleric_d1.png'),
    },
    {
        name: 'Berserker',
        image: require('../Assets/archetypes/td_monsters_berserker_d1.png'),
    },
    {
        name: 'Druid',
        image: require('../Assets/archetypes/td_monsters_druid_d1.png'),
    },
]


class CharacterSelect extends React.Component {
    render() {
        return (
            <div>
                {archetypes.map(a => <div className='class-card' key={a.id}>
                    <h3>{a.name}</h3>
                    <img src={a.image}></img>
                    <br />
                    <button onClick={() => this.props.onSelectArchetype(a.name.toLowerCase())}>Select</button>
                </div>)}
            </div>
        )
    }
}

export default CharacterSelect