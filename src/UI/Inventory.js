import React, { Component } from 'react';
import './UI.css'
import './Inventory.css'
import Uuid from 'uuid/v4'
import PropTypes from 'prop-types';

class Inventory extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
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

    renderHeldItem(item) {
        console.log('item', item);
        return <div>
            
        </div>
    }

    render() {
        const unequippedItems = this.props.player.getUnequippedItems();
        const heldItems = this.props.player.HasBody.getHeldItems();
        const wornItems = this.props.player.HasBody.getWornItems();

        return (
            <div className='ui-widget'>
                <h3>Inventory</h3>
                {heldItems.map(i => <div key={i.id}>{this.renderHeldItem(i)}</div>)}


                {this.props.player.HasInventory.getItems().map(i => <div key={i.id}>{this.renderItem(i)}</div>)}
            </div>
        );
    }
}

Inventory.propTypes = {
    player: PropTypes.object,
};

export default Inventory;
