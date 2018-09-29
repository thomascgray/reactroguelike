import React, { Component } from 'react';

class Inventory extends Component {

    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    render() {
        return (
            <div>
                <h3>Inventory</h3>
                <ul>
                    {this.props.items.map(i => {
                        return <li key={i.id}>
                            {i.name}
                            {!i.isActive && <button onClick={e => this.makeActive(i)}>Make active</button>}
                        </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Inventory;
