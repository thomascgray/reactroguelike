const Random = require("random-js")();

const getRandomVerbForDamageType = damageType => {
    switch (damageType) {
        case 'bludgeoning':
        case 'unarmed':
            return Random.pick([
                'bludgeon',
                'bash',
                'smash',
                'beat',
                'whack',
                'smack',
            ]);
    }
}

const listItems = (items = []) => {
    if (items.length <= 0) {
        return '';
    }
    switch (items.length) {
        case 1:
            return items[0].name
        case 2:
            return items.map(i => i.name).join(' and ')
        default:
            const lastItem = items.pop();
            return `${items.map(i => i.name).join(', ')} and ${lastItem.name}`;
    }
}

const formSecondPersonIsHoldingSentence = items => {
    return `is holding your ${listItems(items)}`
}

const formSecondPersonIsWearingSentence = (items, isSecondaryClause = false) => {
    return `${!isSecondaryClause ? 'is ' : ''}wearing your ${listItems(items)}`
}

const formSecondPersonFullItemsSentence = (isHoldingItems = [], isWearingItems = []) => {
    if (isHoldingItems.length >= 1 && isWearingItems.length <= 0) {
        return formSecondPersonIsHoldingSentence(isHoldingItems);
    }
    if (isWearingItems.length >= 1 && isHoldingItems.length <= 0) {
        return formSecondPersonIsWearingSentence(isWearingItems);
    }
    if (isHoldingItems.length >= 1 && isWearingItems.length >= 1) {
        return `${formSecondPersonIsHoldingSentence(isHoldingItems)} and ${formSecondPersonIsWearingSentence(isWearingItems, true)}`;
    }
}

export default {
    getRandomVerbForDamageType,
    listItems,
    formSecondPersonIsHoldingSentence,
    formSecondPersonIsWearingSentence,
    formSecondPersonFullItemsSentence
}