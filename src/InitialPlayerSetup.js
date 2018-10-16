import { BaseItem, Weapon } from './Item/Item'

export default function (player) {
    // TODO depending on the player archetype give them different starting equipment

    // TODO probably do different scripts for this e.g run witch.js for witches to avoid disgusting switch
    switch (player.HasArchetype.getArchetype()) {
        case 'druid': 
            player.HasInventory.addItem(Weapon('staff'))
            break;
    }
}