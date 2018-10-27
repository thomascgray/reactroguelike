const Random = require("random-js")();

export default {
    getRandomVerbForDamageType: damageType => {
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
    listItems: (items = []) => {
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
                // three or more should list them all except the last one, then "and" the last one
                return `${items.map(i => i.name).join(', ')} and ${lastItem.name}`;
        }
    }
}