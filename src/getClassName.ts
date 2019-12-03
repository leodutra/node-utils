export default function getClassName(target: any): string | null | undefined {
    switch (typeof target) {
        case 'number':
            return isNaN(target) ? 'NaN' : 'Number'
        case 'undefined':
            return void 0
        case 'string':
        case 'function':
        case 'boolean':
        case 'bigint':
        case 'symbol':
        default:
        case 'object':
            return target == null ? null : Object.getPrototypeOf(target).constructor.name
    }
}
