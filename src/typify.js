const getClassName = require('./getClassName')

module.exports = function typify(any, opts = {}) {
    const { ownProperties = false, expandObj = true } = opts
    const t = getClassName(any)
    if (any && typeof any === 'object' && t !== 'Array' && t !== 'RegExp') {
        const result = {}
        for (const prop in any) {
            if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
                continue
            }
            result[prop] = expandObj ? typify(any[prop], opts) : getClassName(any[prop])
        }
        return result
    }
    return t
}
