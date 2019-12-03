export default function bytesToStr(bytes: number[]): string {
    let str = ''
    for (let i = 0, l = bytes.length; i < l; ) {
        str += String.fromCharCode(bytes[i++])
    }
    return str
}
