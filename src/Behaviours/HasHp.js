import _ from 'lodash'

class HasHp {
    constructor(hp) {
        this.hp = _.clone(hp);

        this.functions = {
            addHp: value => {
                this.hp += value;
                return this.hp;
            },
            removeHp: value => {
                this.hp -= value;
                return this.hp;
            },
            getHp: () => {
                return this.hp;
            }
        }
    }

    toState() {
        return {
            hp: this.hp
        }
    }
}

export default HasHp;
