export default function toImmutableProxy<T extends object>(proxyTarget: T): T | (T & Function) {
    switch (typeof proxyTarget) {
        case 'object':
        case 'function':
            return new Proxy(proxyTarget, {
                set(target, prop) {
                    throw new Error('Cannot set property "' + prop.toString() + '", this object is immutable.')
                },
                get(target: any, prop) {
                    return toImmutableProxy(target[prop])
                },
            })
        default:
            return proxyTarget
    }
}
