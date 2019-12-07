export default function fromCharCodes(bytes: number[]) {
    let i = bytes.length
    let str = ''
    while (i--) {
        str = String.fromCharCode(bytes[i]) + str
    }
    return str
}
