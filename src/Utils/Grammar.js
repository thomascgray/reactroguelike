const Random = require("random-js")(); // uses the nativeMath engine

export default {
    getRandomVerbForDamageType: damageType => {
        console.log('damageType', damageType);
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
    },
    isHoldingPreposition: (bodyPartName, item) => {
        switch (bodyPartName) {
            case 'body':
            case 'head':
                return 'on';
            default:
                return 'in';
        }
    },
    isHoldingStyle: (bodyPartName, item) => {
        switch (bodyPartName) {
            case 'body':
            case 'head':
                return 'you are wearing your';
            default:
                return 'you are holding your';
        }
    },
    listItems: items => {
        switch (items.length) {
            case 1:
                return items.name
            case 2:
                return items.map(i => i.name).join(' and ')
            default:
                const lastItem = items.pop();
                // three or more should list them all except the last one, then "and" the last one
                return `${items.map(i => i.name).join(', ')} and ${lastItem.name}`;
        }
    }
}