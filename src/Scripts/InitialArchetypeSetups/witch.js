import { Weapon, Armour } from '../../Item/Item'

export default function (player) {
    player.HasInventory.addItem(Weapon({
        name: 'broomstick',
        damage: '1d12',
        damageType: 'bludgeoning'
    }))

    player.HasInventory.addItem(Armour({
        name: 'witch\'s hat',
        ac: '0',
        isHoldableBy: ['head'],
    }))

    player.HasInventory.addItem(Armour({
        name: 'witch\'s cloak',
        ac: '0',
        isHoldableBy: ['body'],
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