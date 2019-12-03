'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function lazyTemplate(source, defaults = {}) {
    switch (typeof source) {
        case 'string':
            return (params = {}) =>
                source.replace(/\$\{([^\}]*)\}/gm, (segment, stored, i, fullString) =>
                    params[stored] !== void 0 ? params[stored] : defaults[stored]
                )
        case 'object':
        case 'function':
            if (source) {
                return Array.isArray(source)
                    ? (params = {}) => source.map(k => lazyTemplate(k, defaults)(params))
                    : (params = {}) =>
                          Object.getOwnPropertyNames(source).reduce((prev, curr) => {
                              prev[curr] = lazyTemplate(source[curr], defaults)(params)
                              return prev
                          }, {})
            } else {
                return null
            }
        default:
            return () => source
    }
}
exports.default = lazyTemplate
