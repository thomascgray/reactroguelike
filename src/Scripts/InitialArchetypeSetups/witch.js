import { BaseItem, Weapon } from '../../Item/Item'

/**
 * 
 * @param {Player} player 
 */
export default function (player) {
    player.HasInventory.addItem(Weapon({
        name: 'broomstick',
        damage: '1d12',
        damageType: 'bludgeoning'
    }))

    const power = {
        name: 'Stomp',
        type: 'areaOfEffect',
        shape: 'circle',
        range: 2,
        source: 'player',
    }

    player.HasPowers.addPower(power);
}