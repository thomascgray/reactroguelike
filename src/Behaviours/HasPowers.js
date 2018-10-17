import _ from 'lodash'

class HasPowers {
    constructor(powers) {
        this.powers = _.clone(powers);

        this.functions = {
            setPowers: value => {
                this.powers = value;
                return this.powers;
            },
            getPowers: () => {
                return this.powers;
            },
            addPower: power => {
                this.powers.push(power);
                return this.powers;
            }
        }
    }

    toState() {
        return {
            powers: this.powers
        }
    }
}

export default HasPowers;
