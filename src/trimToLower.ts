export default function trimToLower(str: string) {
    return typeof str === 'string' ? str.trim().toLowerCase() : str
}
