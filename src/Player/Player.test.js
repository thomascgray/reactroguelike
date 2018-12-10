import Player from './Player'
import { Weapon } from '../Item/ItemFactories'

describe('Player - getUnequippedItems', () => {
    it('should be 2 when inventory has 2 items and none equipped', () => {
        const p = new Player({
            position: {x: 0, y: 0}
        });

        const itemA = Weapon({ name: 'axe' })
        const itemB = Weapon({ name: 'sword' })

        p.HasInventory.addItem(itemA);
        p.HasInventory.addItem(itemB);

        const unequippedItems = p.getUnequippedItems();

        expect(Array.isArray(unequippedItems)).toBeTruthy();
        expect(unequippedItems.length).toEqual(2);
    })

    it('should be 2 when inventory has 3 items and 1 equipped', () => {
        const p = new Player({
            position: {x: 0, y: 0}
        });

        const itemA = Weapon({ name: 'axe' })
        const itemB = Weapon({ name: 'sword' })
        const itemC = Weapon({ name: 'dagger' })

        p.HasInventory.addItem(itemA);
        p.HasInventory.addItem(itemB);
        p.HasInventory.addItem(itemC);

        p.HasBody.equipItemIntoBodypart(itemA, 'left hand');

        const unequippedItems = p.getUnequippedItems();
        const unequippedItemIds = unequippedItems.map(i => i.id)

        expect(Array.isArray(unequippedItems)).toBeTruthy();
        expect(unequippedItems.length).toEqual(2);
        expect(unequippedItemIds.includes(itemA.id)).toBeFalsy()
        expect(unequippedItemIds.includes(itemB.id)).toBeTruthy()
        expect(unequippedItemIds.includes(itemC.id)).toBeTruthy()
    })

    it('should be empty array when 2 items and both equipped', () => {
        const p = new Player({
            position: {x: 0, y: 0}
        });

        const itemA = Weapon({ name: 'axe' })
        const itemB = Weapon({ name: 'sword' })

        p.HasInventory.addItem(itemA);
        p.HasInventory.addItem(itemB);

        p.HasBody.equipItemIntoBodypart(itemA, 'left hand');
        p.HasBody.equipItemIntoBodypart(itemB, 'right hand');

        const unequippedItems = p.getUnequippedItems();

        expect(Array.isArray(unequippedItems)).toBeTruthy();
        expect(unequippedItems.length).toEqual(0);
    })
})