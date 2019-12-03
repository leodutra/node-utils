export default function toCharEntity(str: any, toHex: boolean) {
    if (typeof str === 'string') {
        let result = ''
        let i = str.length
        while (i--) {
            result = '&#' + (toHex ? 'x' + str.charCodeAt(i).toString(16) : str.charCodeAt(i)) + ';' + result
        }
        return result
    } else {
        return ''
    }
}
