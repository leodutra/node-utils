'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function randomInRange(min, max) {
    return typeof max === 'number' && max > min ? Math.floor(Math.random() * (max - min + 1) + min) : min
}
exports.default = randomInRange
