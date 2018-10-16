import { BaseItem, Weapon } from '../../Item/Item'

export default function (player) {
    player.HasInventory.addItem(Weapon({
        name: 'club',
        damage: 2,
    }))
    player.HasInventory.addItem(Weapon({
        name: 'greataxe',
        damage: 4,
    }))
}