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
        name: 'Mind Blast',
        type: 'areaOfEffect',
        shape: 'square',
        range: 2,
        damage: '1d20',
        source: 'player',
    }

    player.HasPowers.addPower(power);
}