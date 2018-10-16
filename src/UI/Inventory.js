import React, { Component } from 'react';
import './Inventory.css'

class Inventory extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    render() {
        return (
            <div className='inventory'>
                <h3>Inventory</h3>
                {this.props.items.map(i => {
                    return <div key={i.id}>
                        <strong>{i.name}</strong> ({i.type})
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;
