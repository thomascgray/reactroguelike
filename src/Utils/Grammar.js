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
                return 'you have your';
        }
    },
}