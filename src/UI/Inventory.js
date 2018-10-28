import React, { Component } from 'react';
import './UI.css'
import './Inventory.css'
import Uuid from 'uuid/v4'
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
                return <button key={Uuid()} onClick={() => this.equipItem(item, bodyPartName)}>Equp in {bodyPartName}</button>
            })}
        </div>
    }

    renderArmour(item) {
        //TODO replace HasBody.getBodyPartsOfType('hand') with item.isHoldableBy
        return <div>
            <strong>{item.name}</strong> ({item.type})
            {item.isHoldableBy.includes('body') && <button onClick={() => this.equipItem(item, 'body')}>Equip</button>}
            {item.isHoldableBy.includes('head') && <button onClick={() => this.equipItem(item, 'head')}>Equip</button>}
        </div>
    }

    render() {
        return (
            <div className='ui-widget'>
                <h3>Inventory</h3>
                {this.props.items.map(i => <div key={i.id}>{this.renderItem(i)}</div>)}
            </div>
        );
    }
}

export default Inventory;
