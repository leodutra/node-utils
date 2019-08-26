module.exports = function limitStringBy (num, str, complement) {
    if (str.length > num) {
        const k = str.substr(0, num).lastIndexOf('\u0020')
        return str.substr(0, k !== -1 ? k : num) + (complement || '...')
    }
    return str
}
