'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function randomBase62(numDigits) {
    const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    while (numDigits--) {
        // tslint:disable-next-line: no-bitwise
        result += base62[(Math.random() * 61) | 0]
    }
    return result
}
exports.default = randomBase62
