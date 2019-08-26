const encodeTable = {
    '<': 'lt;',
    '>': 'gt;',
    '&': 'amp;',
    '\r': '#13;',
    '\n': '#10;',
    '"': 'quot;',
    "'": 'apos;'
}

module.exports = function encodeHTMLEntities (html) {
    return html.replace(
        /[<>&\r\n"']/gm,
        (match) => '&' + encodeTable[match]
    )
}
