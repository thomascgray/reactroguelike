import { attachProperty } from '../Utils/EntityHelpers'

class HasHp {
    constructor(entity, hp) {
        attachProperty(this, entity, 'hp', hp)
    }

    addHp (value) {
        this.hp += value;
        return this.hp;
    }

    removeHp (value) {
        this.hp -= value;
        return this.hp;
    }

    getHp () {
        return this.hp;
    }
}

export default HasHp;
