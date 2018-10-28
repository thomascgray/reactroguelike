const assert = require('assert');
import HasBody from './HasBody'
import { Weapon } from '../Item/Item'

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

    // this fails, think tests are fucking with each other?
    test('is being held 2', () => {
        const personC = new HasBody('humanoid', 'medium');
        console.log('personC', personC); // at this point, its already got something in its right hand. tests are fucking with each other somewhere
        personC.body.bodyParts['left hand'].isHolding.push(item);

        const match = personC.functions.getBodyPartHoldingItem(itemId);
        expect(match.bodyPartName).toBe('left hand')
        expect(match.bodyPart.isHolding[0].id).toBe(itemId)
    });
});