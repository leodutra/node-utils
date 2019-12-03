'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const encodeTable = {
    '\n': '#10;',
    '\r': '#13;',
    '"': 'quot;',
    '&': 'amp;',
    "'": 'apos;',
    '<': 'lt;',
    '>': 'gt;',
}
const matcher = match => '&' + encodeTable[match]
function encodeHTMLEntities(html = '') {
    return html.replace(/[<>&\r\n"']/gm, matcher)
}
exports.default = encodeHTMLEntities
