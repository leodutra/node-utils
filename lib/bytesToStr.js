'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function bytesToStr(bytes) {
    let str = ''
    for (let i = 0, l = bytes.length; i < l; ) {
        str += String.fromCharCode(bytes[i++])
    }
    return str
}
exports.default = bytesToStr
