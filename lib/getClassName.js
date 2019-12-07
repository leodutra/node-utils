'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function getClassName(target) {
    switch (typeof target) {
        case 'number':
            return isNaN(target) ? 'NaN' : 'Number'
        case 'undefined':
            return 'undefined'
        case 'string':
        case 'function':
        case 'boolean':
        case 'bigint':
        case 'symbol':
        default:
        case 'object':
            return target === null ? 'null' : Object.getPrototypeOf(target).constructor.name
    }
}
exports.default = getClassName
