const assert = require('assert');
import Grammar from './Grammar';
const { Weapon } = require('../Item/Item')

describe('Grammar - listItems', () => {
  test('1 item', () => {
    const items = []
    items.push(Weapon({
        name: 'broomstick',
    }))
  
    expect(Grammar.listItems(items)).toBe('broomstick');
  });

  test('2 items', () => {
    const items = []
    items.push(Weapon({
        name: 'sword',
    }))

    items.push(Weapon({
        name: 'axe',
    }))
  
    expect(Grammar.listItems(items)).toBe('sword and axe');
  });

  test('3 items', () => {
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

  test('3 with different order', () => {
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

describe('Grammar - formIsHoldingSentence', () => {
  test('1 item', () => {
    const items = []
    items.push(Weapon({
        name: 'bow',
    }))
  
    expect(Grammar.formSecondPersonIsHoldingSentence(items)).toBe('is holding your bow');
  });

  test('4 items', () => {
    const items = []
    items.push(Weapon({ name: 'arrow' }))
    items.push(Weapon({ name: 'glove' }))
    items.push(Weapon({ name: 'bowtie' }))
    items.push(Weapon({ name: 'axe' }))
  
    expect(Grammar.formSecondPersonIsHoldingSentence(items)).toBe('is holding your arrow, glove, bowtie and axe');
  });
});

describe('Grammar - formIsWearingSentence', () => {
  test('1 item', () => {
    const items = []
    items.push(Weapon({
        name: 'bow',
    }))
  
    expect(Grammar.formSecondPersonIsWearingSentence(items)).toBe('is wearing your bow');
  });

  test('4 items', () => {
    const items = []
    items.push(Weapon({ name: 'arrow' }))
    items.push(Weapon({ name: 'glove' }))
    items.push(Weapon({ name: 'bowtie' }))
    items.push(Weapon({ name: 'axe' }))
  
    expect(Grammar.formSecondPersonIsWearingSentence(items)).toBe('is wearing your arrow, glove, bowtie and axe');
  });
});