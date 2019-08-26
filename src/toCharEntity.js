module.exports = function toCharEntity (str, toHex) {
    let result = ''
    for (let i = 0, l = str.length; i < l;) {
        result += `&#${toHex ? 'x' + str.charCodeAt(i++).toString('16') : str.charCodeAt(i++)};`
    }
    return result
}
