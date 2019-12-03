export default function toImmutableProxy(proxyTarget: any): any {
    switch (typeof proxyTarget) {
        case 'object':
        case 'function':
            return new Proxy(proxyTarget, {
                set: function immutableProxySet(target, prop) {
                    throw new Error('Cannot set property "' + prop.toString() + '", this object is immutable.')
                },

                get: function immutableProxyGet(target, prop) {
                    return toImmutableProxy(target[prop])
                },
            })
    }
    return proxyTarget
}
