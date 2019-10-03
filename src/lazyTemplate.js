module.exports = function lazyTemplate(source, defaults) {
    defaults = defaults || {}
    switch (typeof source) {
        case 'string':
            return function (params) { // String
                params = params || {}
                return source.replace(/\$\{([^\}]*)\}/gm, function (segment, stored, i, fullString) {
                    return params[stored] !== void 0 ? params[stored] : defaults[stored]
                })
            }
        case 'object':
        case 'function':
            if (source) { // avoids null
                if (Array.isArray(source)) { // Array
                    return function (params) {
                        return source.map(function (k) {
                            return curried(k, defaults)(params)
                        })
                    }
                }
                return function (params) { // Object, RegExp, Function
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            source[key] = curried(source[key], defaults)(params)
                        }
                    }
                    return source
                }
            }
        default: // Boolean, Number
            return function () { return source }
    }
}