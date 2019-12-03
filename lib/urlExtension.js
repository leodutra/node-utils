'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function urlExtension(url) {
    if (typeof url === 'string') {
        const match = url.replace(/\r?\n|(?:[?#].+)?/im, '').match(/\.(\w+)$/im)
        return match ? match[1].trim() : null
    } else {
        return ''
    }
}
exports.default = urlExtension
