const getClassName = require('./getClassName')

module.exports = function typify (any, ownProperties) {
    const t = getClassName(any)
    if (t === 'Object') {
        const result = {}
        for (const prop in any) {
            if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
                continue
            }
            result[prop] = getClassName(any[prop])
        }
        return result
    }
    return t
}
