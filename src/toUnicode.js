module.exports = function toUnicode (str) {
    let result = ''
    let i = str.length
    while (i--) {
        result = '\\u' + ('000' + str.charCodeAt(i).toString(16)).substr(-4) + result
    }
    return result
}
