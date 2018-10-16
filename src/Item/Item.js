const BaseItem = (name, type) => {
    return {
        name,
        type
    }
}

const Weapon = (name) => {
    const type = 'weapon';

    return {
        name,
        type
    }
}

export {
    BaseItem,
    Weapon
}