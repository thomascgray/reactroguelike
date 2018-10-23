const title = (string) => {
    return string.split(' ').map(word => {
        if (word !== 'of') {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word
    }).join(' ');
}

export {
    title
}