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

const Weapon = (props) => {
    const type = 'weapon';
    props.type = type;
    return BaseItem(props)
}

const Armour = (props) => {
    const type = 'armour';
    props.type = 'armour'
    return BaseItem(props)
}

export {
    BaseItem,
    Weapon,
    Armour
}