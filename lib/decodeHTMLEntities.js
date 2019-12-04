'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const decodeTable = {
    '#39': "'",
    '#47': '/',
    '#x27': "'",
    '#x2F': '/',
    'amp': '&',
    'apos': "'",
    'gt': '>',
    'lt': '<',
    'nbsp': '\u0020',
    'quot': '"',
}
const matcher = (match, entity) => decodeTable[entity] || match
function decodeHTMLEntities(str = '') {
    return str.replace(/&([^;]+);/gm, matcher)
}
exports.default = decodeHTMLEntities
