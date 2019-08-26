module.exports = function randomBase62 (numDigits) {
    const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    while (numDigits--) {
        result += base62[Math.random() * 61 >> 0]
    }
    return result
}
