import React, { Component } from 'react';
import './UI.css'
import './Inventory.css'
class Inventory extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    getBodyPartsThatCanHold () {
        const bodyParts = Object.keys(this.props.player.HasBody.getBodyParts()).filter(bodyPartName => {
            return this.props.player.HasBody.getBodyParts()[bodyPartName].canHold;
        });
        return bodyParts;
    }

    equipItem(item, bodyPartName) {
        this.props.player.HasBody.equipItem(item, bodyPartName);
        this.props.closeInventory();
    }

    renderItem(item) {
        //TODO do different things depending on item type e.g not all items are equippable in player hands
        return <div key={item.id}>
            {item.type === 'weapon' && this.renderWeapon(item)}
            {item.type === 'armour' && this.renderArmour(item)}
        </div>
    }

    renderWeapon(item) {
        return <div>
            <strong>{item.name}</strong> ({item.type})
            {this.props.player.HasBody.getBodyPartsOfType('hand').map(bodyPartName => {
                return <button>Equp in {bodyPartName}</button>
            })}
        </div>
    }

    renderArmour(item) {
        //TODO replace HasBody.getBodyPartsOfType('hand') with item.isHoldableBy
        console.log('item', item);
        return <div>
            <strong>{item.name}</strong> ({item.type})
            {item.isHoldableBy.includes('fullBody') && <button>Equip</button>}
            
        </div>
    }

    render() {
        return (
            <div className='ui-widget'>
                <h3>Inventory</h3>
                {this.props.items.map(i => this.renderItem(i))}
            </div>
        );
    }
}

export default Inventory;
