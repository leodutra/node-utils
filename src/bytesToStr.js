module.exports = function bytesToStr (bytes) {
    let str = ''
    for (let i = 0, l = bytes.length; i < l;) {
        str += String.fromCharCode(bytes[i++])
    }
    return str
}
