const safeStringify = require('fast-safe-stringify')

module.exports = function stringify (obj, replacer, spaces) {
    return safeStringify(obj, replacer, spaces)
}
