const getClassName = require('./getClassName')

module.exports = function typify(any, opts = {}) {
    const { ownProperties = false, deep = true, deepArray = true, deepObj = true } = opts
    const t = getClassName(any)
    if (any && typeof any === 'object' && t !== 'RegExp') {
        if (t === 'Array') {
            if (deep && deepArray) {
                return any.map(x => typify(x, opts))
            }
        } else {
            if (deep && deepObj) {
                const result = {}
                for (const prop in any) {
                    if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
                        continue
                    }
                    result[prop] = typify(any[prop], opts)
                }
                return result
            }
        }
    }
    return t
}
