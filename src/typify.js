const getClassName = require('./getClassName')

module.exports = function typify(any, opts = {}) {
    const { ownProperties = false, expandObj = true, expandArray = true } = opts
    const t = getClassName(any)
    if (any && typeof any === 'object' && t !== 'RegExp') {
        if (t === 'Array') {
            if (expandArray) {
                return any.map(x => typify(x, opts))
            }
        } else {
            const result = {}
            for (const prop in any) {
                if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
                    continue
                }
                result[prop] = expandObj ? typify(any[prop], opts) : getClassName(any[prop])
            }
            return result
        }
    }
    return t
}
