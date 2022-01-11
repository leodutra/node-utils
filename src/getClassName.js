// TODO: rename jsClassName
function getClassName (any) {
    switch (typeof any) {
    case 'number':
        return isNaN(any) ? 'NaN' : 'Number'
    case 'undefined':
        return void 0
    case 'string':
    case 'function':
    case 'boolean':
    case 'bigint':
    case 'symbol':
    default:
    case 'object':
        return any == null
            ? null
            : Object.getPrototypeOf(any).constructor.name
    }
}

module.exports = getClassName
