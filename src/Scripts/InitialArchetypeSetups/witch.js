import { BaseItem, Weapon } from '../../Item/Item'

export default function (player) {
    player.HasInventory.addItem(Weapon({
        name: 'broomstick',
        damage: '1d12',
        damageType: 'bludgeoning'
    }))
}