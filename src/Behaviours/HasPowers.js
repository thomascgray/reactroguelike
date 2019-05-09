import { attachProperty } from '../Utils/EntityHelpers'

class HasPowers {
    constructor(entity, powers = []) {
        attachProperty(this, entity, 'powers', powers)
    }

    setPowers(value) {
        this.powers = value;
        return this.powers;
    }

    getPowers() {
        return this.powers;
    }

    addPower(power) {
        this.powers.push(power);
        return this.powers;
    }
}

export default HasPowers;
