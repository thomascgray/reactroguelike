const generate = (width, height) => {
    let map = [];

    for(let y = 0; y < height; y++) {
        let row = [];
        for(let x = 0; x < width; x++) {
            row[x] = 0;
        }
        map.push(row);
    }

    return map;
}


export {
    generate
}