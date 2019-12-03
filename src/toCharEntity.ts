export default function toCharEntity(str: string, toHex: boolean) {
    let result = ''
    let i = str.length
    while (i--) {
        result = '&#' + (toHex ? 'x' + str.charCodeAt(i).toString(16) : str.charCodeAt(i)) + ';' + result
    }
    return result
}
