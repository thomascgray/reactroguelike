import Grammar from './Grammar';
const { Weapon } = require('../Item/ItemFactories')

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

describe('Grammar - formSecondPersonIsHoldingSentence', () => {
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

describe('Grammar - formSecondPersonIsWearingSentence', () => {
  test('1 item', () => {
    const items = []
    items.push(Weapon({ name: 'bow' }))
  
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

describe('Grammar - formSecondPersonFullItemsSentence', () => {
  test('holding 1, wearing 0', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'axe' }))

    const isWearingItems = []

    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your axe');
  });

  test('holding 0, wearing 1', () => {
    const isHoldingItems = []
    
    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'dress' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is wearing your dress');
  });

  test('holding 1, wearing 1', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'bow' }))

    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'glove' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your bow and wearing your glove');
  });

  test('holding 2, wearing 1', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'bow' }))
    isHoldingItems.push(Weapon({ name: 'torch' }))

    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'glove' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your bow and torch and wearing your glove');
  });

  test('holding 2, wearing 2', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'bow' }))
    isHoldingItems.push(Weapon({ name: 'torch' }))

    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'glove' }))
    isWearingItems.push(Weapon({ name: 'hat' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your bow and torch and wearing your glove and hat');
  });

  test('holding 3, wearing 2', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'bow' }))
    isHoldingItems.push(Weapon({ name: 'torch' }))
    isHoldingItems.push(Weapon({ name: 'stick' }))

    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'glove' }))
    isWearingItems.push(Weapon({ name: 'hat' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your bow, torch and stick and wearing your glove and hat');
  });

  test('holding 3, wearing 3', () => {
    const isHoldingItems = []
    isHoldingItems.push(Weapon({ name: 'bow' }))
    isHoldingItems.push(Weapon({ name: 'torch' }))
    isHoldingItems.push(Weapon({ name: 'stick' }))

    const isWearingItems = []
    isWearingItems.push(Weapon({ name: 'glove' }))
    isWearingItems.push(Weapon({ name: 'hat' }))
    isWearingItems.push(Weapon({ name: 'scarf' }))
  
    expect(Grammar.formSecondPersonFullItemsSentence(isHoldingItems, isWearingItems)).toBe('is holding your bow, torch and stick and wearing your glove, hat and scarf');
  });
});