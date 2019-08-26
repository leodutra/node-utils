module.exports = function toImmutableProxy (any) {
    switch (typeof any) {
    case 'object':
    case 'function':
    case 'xml':
        return new Proxy(any, {
            set: function immutableProxySet (target, prop) {
                throw new Error('Cannot set property "' + prop + '", this object is immutable.')
            },

            get: function immutableProxyGet (target, prop) {
                return toImmutableProxy(target[prop])
            }
        })
    }
    return any
}
