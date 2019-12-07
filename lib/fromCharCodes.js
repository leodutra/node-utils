'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function fromCharCodes(bytes) {
    let i = bytes.length
    let str = ''
    while (i--) {
        str = String.fromCharCode(bytes[i]) + str
    }
    return str
}
exports.default = fromCharCodes
