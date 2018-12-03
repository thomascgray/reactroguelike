import { Weapon, Armour } from '../../Item/ItemFactories'

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

    player.HasPowers.addPower({
        name: 'Mind Blast',
        type: 'areaOfEffect',
        shape: 'square',
        range: 2,
        damage: '1d20',
        source: 'player',
    });

    player.HasPowers.addPower({
        name: 'Line of Blast',
        type: 'lineFromPlayer',
        maxRange: 5,
        damage: '1d20',
    });
}