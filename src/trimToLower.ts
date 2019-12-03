export default function trimToLower(str: any) {
    return typeof str === 'string' ? str.trim().toLowerCase() : ''
}
