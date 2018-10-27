const assert = require('assert');
import Grammar from './Grammar';
const { Weapon } = require('../Item/Item')

describe('Grammar', () => {
  test('Grammar - list items - 1 item', () => {
    const items = []
    items.push(Weapon({
        name: 'broomstick',
    }))
  
    expect(Grammar.listItems(items)).toBe('broomstick');
  });

  test('Grammar - list items - 2 items', () => {
    const items = []
    items.push(Weapon({
        name: 'sword',
    }))

    items.push(Weapon({
        name: 'axe',
    }))
  
    expect(Grammar.listItems(items)).toBe('sword and axe');
  });

  test('Grammar - list items - 3 items', () => {
    const items = []
    items.push(Weapon({
        name: 'sword',
    }))

    items.push(Weapon({
        name: 'axe',
    }))

    items.push(Weapon({
        name: 'hammer',
    }))
  
    expect(Grammar.listItems(items)).toBe('sword, axe and hammer');
  });

  test('Grammar - list items - 3 items, different order', () => {
    const items = []
    items.push(Weapon({
        name: 'hammer',
    }))

    items.push(Weapon({
        name: 'sword',
    }))

    items.push(Weapon({
        name: 'axe',
    }))
  
    expect(Grammar.listItems(items)).toBe('hammer, sword and axe');
  });
});