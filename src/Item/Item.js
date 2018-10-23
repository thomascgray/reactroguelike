import Uuid from 'uuid/v4'

const BaseItem = ({ name, type, damage }) => {
    return {
        id: Uuid(),
        name,
        type,
        damage
    }
}

const Weapon = ({ name, damage }) => {
    const type = 'weapon';
    return BaseItem({ name, type, damage })
}

export {
    BaseItem,
    Weapon
}