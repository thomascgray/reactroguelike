import React from 'react';

const archetypes = [
    {
        name: 'Witch',
        image: require('../Assets/archetypes/td_monsters_witch_d1.png'),
        id: 'witch'
    }
]


class CharacterSelect extends React.Component {
    render() {
        return (
            <div>
                {archetypes.map(a => <div key={a.id}>
                    <h3>{a.name}</h3>
                    <img src={a.image}></img>
                    <button onClick={() => this.props.onSelectArchetype(a.id)}>Select</button>
                </div>)}
            </div>
        )
    }
}

export default CharacterSelect