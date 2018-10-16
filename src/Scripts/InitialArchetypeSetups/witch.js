import { BaseItem, Weapon } from '../../Item/Item'

export default function (player) {
    player.HasInventory.addItem(Weapon('dagger'))
    player.HasInventory.addItem(Weapon('broomstick'))
}