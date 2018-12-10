import HasBody from './HasBody'
import { Weapon } from '../Item/ItemFactories'

describe('HasBody - getBodyPartHoldingItem', () => {
    const item = Weapon({ name: 'axe' });
    const itemId = item.id;
    
    test('not being held', () => {
        const personA = new HasBody('humanoid', 'medium');
        const match = personA.functions.getBodyPartHoldingItem(itemId);
        expect(match).toBe(null);
    });
    
    test('is being held', () => {
        const personB = new HasBody('humanoid', 'medium');
        personB.body.bodyParts['right hand'].isHolding.push(item);

        const match = personB.functions.getBodyPartHoldingItem(itemId);
        expect(match.bodyPartName).toBe('right hand')
        expect(match.bodyPart.isHolding[0].id).toBe(itemId)
    });

    test('is being held 2', () => {
        const personC = new HasBody('humanoid', 'medium');
        
        personC.body.bodyParts['left hand'].isHolding.push(item);

        const match = personC.functions.getBodyPartHoldingItem(itemId);
        expect(match.bodyPartName).toBe('left hand')
        expect(match.bodyPart.isHolding[0].id).toBe(itemId)
    });
});

describe('HasBody - getHeldItemsByBodyPartName', () => {
    it('should return an object containing left hand which contains an array holding 1 item', () => {
        const body = new HasBody('humanoid', 'medium');

        body.functions.equipItemIntoBodypart(Weapon({ name: 'axe' }), 'left hand');

        const heldItems = body.functions.getHeldItemsByBodyPartName();
        
        expect(Object.getOwnPropertyNames(heldItems).length).toEqual(1);
        expect(heldItems['left hand']).toBeTruthy();

        expect(Array.isArray(heldItems['left hand'])).toBeTruthy();

        expect(heldItems['left hand'].length).toEqual(1);
    })

    it('should return an object containing left hand and right hand, each which contains an array holding 1 item', () => {
        const body = new HasBody('humanoid', 'medium');

        body.functions.equipItemIntoBodypart(Weapon({ name: 'axe' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'sword' }), 'right hand');

        const heldItems = body.functions.getHeldItemsByBodyPartName();

        expect(Object.getOwnPropertyNames(heldItems).length).toEqual(2);
        expect(heldItems['left hand']).toBeTruthy();
        expect(heldItems['right hand']).toBeTruthy();

        expect(Array.isArray(heldItems['left hand'])).toBeTruthy();
        expect(Array.isArray(heldItems['right hand'])).toBeTruthy();

        expect(heldItems['left hand'].length).toEqual(1);
        expect(heldItems['right hand'].length).toEqual(1);
    })

    it('should return an object containing left hand which contains an array holding 2 items', () => {
        const body = new HasBody('humanoid', 'medium');

        body.functions.equipItemIntoBodypart(Weapon({ name: 'axe' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'sword' }), 'left hand');

        const heldItems = body.functions.getHeldItemsByBodyPartName();
        
        expect(Object.getOwnPropertyNames(heldItems).length).toEqual(1);
        expect(heldItems['left hand']).toBeTruthy();

        expect(Array.isArray(heldItems['left hand'])).toBeTruthy();

        expect(heldItems['left hand'].length).toEqual(2);
    })
})

describe('HasBody - getEquippedItems', () => {
    it('should include all held items', () => {
        const body = new HasBody('humanoid', 'medium');

        body.functions.equipItemIntoBodypart(Weapon({ name: 'axe' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'sword' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'dagger' }), 'right hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'stick' }), 'right hand');

        const items = body.functions.getEquippedItems();

        expect(Array.isArray(items)).toBeTruthy();

        expect(items.length).toEqual(4);
    })

    it('should include all held items', () => {
        const body = new HasBody('humanoid', 'medium');

        body.functions.equipItemIntoBodypart(Weapon({ name: 'axe' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'sword' }), 'left hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'dagger' }), 'right hand');
        body.functions.equipItemIntoBodypart(Weapon({ name: 'stick' }), 'right hand');

        const items = body.functions.getEquippedItems();

        expect(Array.isArray(items)).toBeTruthy();

        expect(items.length).toEqual(4);
    })
})