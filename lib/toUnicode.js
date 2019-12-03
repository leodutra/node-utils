'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function toUnicode(str) {
    if (typeof str === 'string') {
        let result = ''
        let i = str.length
        while (i--) {
            result = '\\u' + ('000' + str.charCodeAt(i).toString(16)).substr(-4) + result
        }
        return result
    } else {
        return ''
    }
}
exports.default = toUnicode
