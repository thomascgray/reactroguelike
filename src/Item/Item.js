import Uuid from 'uuid/v4'

const BaseItem = (props) => {
    const baseItem = {
        id: Uuid(),
        isHoldableBy: ['hand'],
    }
    return {
        ...baseItem,
        ...props
    }
}

const Weapon = ({ name, damage, damageType }) => {
    const type = 'weapon';
    return BaseItem({ name, type, damage, damageType })
}

const Armour = ({ name, ac, armourType }) => {
    const type = 'armour';
    return BaseItem({ name, type, ac, armourType })
}

export {
    BaseItem,
    Weapon,
    Armour
}