'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function rotateArray(offset, array) {
    offset = -(offset % array.length)
    return array.slice(offset).concat(array.slice(0, offset))
}
exports.default = rotateArray
