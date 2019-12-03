'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function toImmutableProxy(proxyTarget) {
    switch (typeof proxyTarget) {
        case 'object':
        case 'function':
            return new Proxy(proxyTarget, {
                set(target, prop) {
                    throw new Error('Cannot set property "' + prop.toString() + '", this object is immutable.')
                },
                get(target, prop) {
                    return toImmutableProxy(target[prop])
                },
            })
        default:
            return proxyTarget
    }
}
exports.default = toImmutableProxy
