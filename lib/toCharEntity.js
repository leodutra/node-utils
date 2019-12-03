'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function toCharEntity(str, toHex) {
    if (typeof str === 'string') {
        let result = ''
        let i = str.length
        while (i--) {
            result = '&#' + (toHex ? 'x' + str.charCodeAt(i).toString(16) : str.charCodeAt(i)) + ';' + result
        }
        return result
    } else {
        return ''
    }
}
exports.default = toCharEntity
