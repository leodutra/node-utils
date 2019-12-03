interface IHash {
    [key: string]: any
}

export default function lazyTemplate(source: any, defaults: IHash = {}): any {
    switch (typeof source) {
        case 'string':
            return (params: IHash = {}) =>
                source.replace(/\$\{([^\}]*)\}/gm, (segment, stored, i, fullString) =>
                    params[stored] !== void 0 ? params[stored] : defaults[stored]
                )
        case 'object':
        case 'function':
            if (source) {
                return Array.isArray(source)
                    ? (params: IHash = {}) => source.map(k => lazyTemplate(k, defaults)(params))
                    : (params: IHash = {}) =>
                          Object.getOwnPropertyNames(source).reduce((prev: IHash, curr) => {
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
