const assert = require('assert');
import HasBody from './HasBody'
import { Weapon } from '../Item/Item'

describe('HasBody', () => {
    const person = new HasBody('humanoid', 'medium');
    const item = Weapon({ name: 'axe' });
    const itemId = item.id;
    
    person.body.bodyParts['right hand'].isHolding.push(item);

    test('getBodyPartHoldingItem', () => {
        expect(true).toEqual(false);
    });
});