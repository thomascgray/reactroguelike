import Item from './Item';

const Weapon = (props) => {
  const item = new Item();

  item.type = 'weapon';

  Object.keys(props).forEach((itemAttributeName) => {
    item[itemAttributeName] = props[itemAttributeName];
  });

  return item;
};

const Armour = (props) => {
  const item = new Item();

  item.type = 'armour';
  item.equipVerb = 'wear';

  Object.keys(props).forEach((itemAttributeName) => {
    item[itemAttributeName] = props[itemAttributeName];
  });

  return item;
};

export {
  Weapon,
  Armour,
};
