import React, { Component } from 'react';
import './UI.css'
import './Inventory.css'
import Uuid from 'uuid/v4'
import PropTypes from 'prop-types';
import Grammar from '../Utils/Grammar';
class Inventory extends Component {
    makeActive (i) {
        this.props.player.setActiveMeleeWeapon(i.id)
    }

    equipItem(item, bodyPartName) {
        this.props.player.HasBody.equipItem(item, bodyPartName);
        this.props.closeInventory();
    }

    unequipItem(item, bodyPartName) {
        this.props.player.HasBody.unequipItem(item);
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
        return <div>
            <strong>{item.name}</strong> ({item.type})
            {item.isHoldableBy.includes('body') && <button onClick={() => this.equipItem(item, 'body')}>Equip onto body</button>}
            {item.isHoldableBy.includes('head') && <button onClick={() => this.equipItem(item, 'head')}>Equip onto head</button>}
        </div>
    }

    renderHeldItem(bodyPartName, items) {
        return <div>
            your {bodyPartName} {Grammar.formSecondPersonIsHoldingSentence(items)}
            {items.map(item => {
                return <button onClick={() => this.unequipItem(item)}>Unequip {item.name}</button>
            })}
        </div>
    }

    renderWornItem(bodyPartName, items) {
        return <div>
            your {bodyPartName} {Grammar.formSecondPersonIsWearingSentence(items)}
            {items.map(item => {
                return <button onClick={() => this.unequipItem(item)}>Unequip {item.name}</button>
            })}
        </div>
    }

    render() {
        const unequippedItems = this.props.player.getUnequippedItems();
        const heldItems = this.props.player.HasBody.getHeldItemsByBodyPartName();
        const wornItems = this.props.player.HasBody.getWornItemsByBodyPartName();

        return (
            <div className='ui-widget'>
                <h3>Inventory</h3>
                {Object.keys(heldItems).map(bodyPartName => <div key={bodyPartName}>{this.renderHeldItem(bodyPartName, heldItems[bodyPartName])}</div>)}
                {Object.keys(wornItems).map(bodyPartName => <div key={bodyPartName}>{this.renderWornItem(bodyPartName, wornItems[bodyPartName])}</div>)}
                
                {Object.getOwnPropertyNames(heldItems).length >= 1 || Object.getOwnPropertyNames(wornItems).length >= 1 && <hr />}

                {unequippedItems.map(i => <div key={i.id}>{this.renderItem(i)}</div>)}
            </div>
        );
    }
}

Inventory.propTypes = {
    player: PropTypes.object,
};

export default Inventory;
