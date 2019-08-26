const decodeTable = {
    amp: '&',
    apos: '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#47': '/',
    lt: '<',
    gt: '>',
    nbsp: ' ',
    quot: '"'
}

module.exports = function decodeHTMLEntities (text) {
    return text.replace(
        /&([^;]+);/gm,
        (match, entity) => decodeTable[entity] || match
    )
}
