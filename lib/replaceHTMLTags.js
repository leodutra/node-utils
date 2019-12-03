'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function replaceHTMLTags(str) {
    return typeof str === 'string' ? str.replace(/<\s*br\s*\/?>/gim, '\n').replace(/<([^>]+)>/gim, '') : ''
}
exports.default = replaceHTMLTags
