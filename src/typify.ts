import getClassName from './getClassName'

export default function typify(target: any, ownProperties: boolean) {
    const className = getClassName(target)
    if (className === 'Object') {
        const result: { [key: string]: any } = {}
        for (const prop in target) {
            if (ownProperties && !Object.prototype.hasOwnProperty.call(target, prop)) {
                continue
            }
            result[prop] = getClassName(target[prop])
        }
        return result
    }
    return className
}
