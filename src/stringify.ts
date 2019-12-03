import safeStringify from 'fast-safe-stringify'

export default function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number) {
    return safeStringify(value, replacer, space)
}
