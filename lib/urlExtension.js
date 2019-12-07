'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function urlExtension(url) {
    if (typeof url === 'string') {
        const match = url.replace(/(?:[?#].+)|\r?\n/gim, '').match(/\.(\w+)$/im)
        return match ? match[1].trim() : ''
    } else {
        return ''
    }
}
exports.default = urlExtension
