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

function decodeHTMLEntities (text) {
    return text.replace(
        /&([^;]+);/gm,
        (match, entity) => decodeTable[entity] || match
    )
}

const encodeTable = {
    '<': 'lt;',
    '>': 'gt;',
    '&': 'amp;',
    '\r': '#13;',
    '\n': '#10;',
    '"': 'quot;',
    "'": 'apos;'
}

function encodeHTMLEntities (html) {
    return html.replace(
        /[<>&\r\n"']/gm,
        (match) => '&' + encodeTable[match]
    )
}

module.exports = {
    decodeHTMLEntities,
    encodeHTMLEntities
}
