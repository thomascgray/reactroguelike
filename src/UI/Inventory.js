import React, { Component } from 'react';
import './UI.css'
import './Inventory.css'
import { LogMessage } from '../Log/LogActions'
class Inventory extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    getBodyPartsThatCanHold () {
        const bodyParts = Object.keys(this.props.player.HasBodyParts.getBodyParts()).filter(bodyPartName => {
            return this.props.player.HasBodyParts.getBodyParts()[bodyPartName].canHold;
        });

        return bodyParts;
    }

    equipItem(item, bodyPartName) {
        this.props.player.HasBodyParts.equipItemIntoBodypart(item, bodyPartName);
        LogMessage(`you grab your ${item.name} with your ${bodyPartName}`)
        this.props.closeInventory();
    }

    render() {
        return (
            <div className='ui-widget'>
                <h3>Inventory</h3>
                {this.props.items.map(i => {
                    return <div key={i.id}>
                        <strong>{i.name}</strong> ({i.type})
                        <br />
                        {this.getBodyPartsThatCanHold().map(bodyPartName => {
                            return <button onClick={() => this.equipItem(i, bodyPartName)}>Equip in {bodyPartName}</button>
                        })}
                        <br />
                        <br />
                    </div>
                })}
            </div>
        );
    }
}

export default Inventory;
