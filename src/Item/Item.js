const BaseItem = ({ name, type, damage }) => {
    return {
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