const preparePower = (power) => {
    let source
    if (power.source === 'player') {
        source = window.player.HasPosition.getPosition()
    }

    power.tiles = []

    if (power.shape === 'square') {
        const newTiles = []
    
        const startX = (source.x - power.range < 0 ? 0 : source.x - power.range);
        const startY = (source.y - power.range < 0 ? 0 : source.y - power.range);
    
        const endX = source.x + power.range;
        const endY = source.y + power.range;
    
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                newTiles.push({ x, y })
            }
        }
    
        power.tiles = newTiles;
    }

    return power;
}

export {
    preparePower
}