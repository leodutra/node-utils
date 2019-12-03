export default function randomBase62(numDigits: number) {
    const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    while (numDigits--) {
        // tslint:disable-next-line: no-bitwise
        result += base62[(Math.random() * 61) | 0]
    }
    return result
}
